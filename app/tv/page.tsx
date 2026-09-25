"use client";
import Link from "next/link";
import { HeroDynamic } from "@/components/layout/HeroDynamic";
import { CarouselDpad } from "@/components/layout/CarouselDpad";
import { ContentCard } from "@/components/cards/ContentCard";
import { ChannelCard } from "@/components/cards/ChannelCard";
import { MovieCard } from "@/components/cards/MovieCard";
import { CountryCard } from "@/components/cards/CountryCard";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { DocumentaryCard } from "@/components/cards/DocumentaryCard";
import { CultureCard } from "@/components/cards/CultureCard";
import { LiveBadge } from "@/components/media/LiveBadge";
import { mockContents, mockChannels, mockMovies, mockCountries, mockCategories } from "@/lib/mock-data";
import { continueWatching } from "@/lib/mock-extended";
import { useMiniPlayer } from "@/components/media/MiniPlayer";

function ContinueCard({ item, onPlay }: { item: typeof continueWatching[number]; onPlay:()=>void }){
  return (
    <div onClick={onPlay} tabIndex={0} data-focusable="true" className="group w-[300px] shrink-0 snap-start overflow-hidden rounded-xl border border-[#222] bg-[#141414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] cursor-pointer">
      <div className="relative aspect-video overflow-hidden bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.thumb} alt={item.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition"/>
        <span className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 group-hover:opacity-100 transition"><span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black">▶</span></span>
      </div>
      <div className="p-3">
        <p className="line-clamp-1 text-sm font-semibold text-white">{item.title}</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#222]"><div className="h-full bg-[#e50914]" style={{ width:`${item.progress}%` }}/></div>
        <p className="mt-1 text-xs text-[#8a8a8a]">{item.progress}% · {item.remain}</p>
      </div>
    </div>
  );
}

export default function TVHome(){
  const { play } = useMiniPlayer();
  return (
    <div className="space-y-8 py-6">
      <HeroDynamic />

      {/* AO VIVO AGORA */}
      <CarouselDpad title="AO VIVO AGORA" action={<Link href="/tv/ao-vivo" className="text-xs font-bold tracking-widest text-[#e50914] hover:text-white">VER GRADE →</Link>}>
        {mockChannels.filter(c=>c.isLive).map(c=> <div key={c.id} className="w-[320px] shrink-0 snap-start"><ChannelCard channel={c} /></div>)}
        {mockChannels.slice(0,2).map(c=> <div key={c.id+"2"} className="w-[320px] shrink-0 snap-start"><div className="rounded-xl border border-[#222] bg-[#141414] p-3"><div className="flex items-center gap-2 text-xs"><LiveBadge/> <span className="text-white font-semibold">{c.name}</span></div><p className="mt-2 text-sm text-white line-clamp-1">Universidad y Cultura</p><p className="text-xs text-[#8a8a8a]">{c.country.flag} {c.country.name} · 17:00 — 18:00</p></div></div>)}
      </CarouselDpad>

      {/* CONTINUE ASSISTINDO */}
      <CarouselDpad title="CONTINUE ASSISTINDO">
        {continueWatching.map(it=> <ContinueCard key={it.id} item={it} onPlay={()=> play({ id:it.id, title:it.title, thumb:it.thumb })} />)}
      </CarouselDpad>

      {/* CANAIS EM DESTAQUE */}
      <CarouselDpad title="CANAIS EM DESTAQUE">
        {mockChannels.map(c=> <div key={c.id} className="w-[260px] shrink-0 snap-start"><ChannelCard channel={c} /><p className="mt-2 px-1 text-xs text-[#8a8a8a]">{c.category} · {c.country.flag} {c.country.code}</p></div>)}
      </CarouselDpad>

      {/* CINEMA LATINO-AMERICANO */}
      <section className="space-y-3">
        <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-white">Cinema latino-americano</h2><Link href="/tv/cinema" className="text-xs tracking-widest text-[#8a8a8a] hover:text-white">VER CATÁLOGO →</Link></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockMovies.map(m=> <MovieCard key={m.id} movie={m} />)}
          <Link href="/tv/filmes/1" className="group overflow-hidden rounded-xl border border-[#222] bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 grid place-items-center text-center hover:border-[#333]">
            <span className="text-sm font-bold text-white">Explorar curtas, longas e festivais</span><span className="mt-2 text-xs text-[#8a8a8a]">Argentina · Brasil · Chile · 2024</span>
          </Link>
        </div>
      </section>

      {/* CULTURA */}
      <CarouselDpad title="CULTURA">
        {[
          { title:"Retablos andinos — patrimônio vivo", excerpt:"Oficinas e mestres do barroco mestiço no Peru.", tag:"Patrimônio", thumb:"https://picsum.photos/seed/cult1/640/400" },
          { title:"Literatura mapuche contemporânea", excerpt:"Vozes que reescrevem o território.", tag:"Literatura", thumb:"https://picsum.photos/seed/cult2/640/400" },
          { title:"Choro e samba — rio adentro", excerpt:"Rodas e entrevistas em estúdios cariocas.", tag:"Música", thumb:"https://picsum.photos/seed/cult3/640/400" },
        ].map((c,i)=> <div key={i} className="w-[340px] shrink-0 snap-start"><CultureCard {...c} /></div>)}
      </CarouselDpad>

      {/* DOCUMENTÁRIOS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-white">Documentários</h2><Link href="/tv/documentarios" className="text-xs tracking-widest text-[#8a8a8a] hover:text-white">VER TODOS →</Link></div>
        <div className="grid md:grid-cols-2 gap-4">
          {mockContents.slice(0,4).map(c=> <DocumentaryCard key={c.id} title={c.title} country={c.countryId?.toUpperCase() ?? "BR"} year="2024" thumb={c.thumbnail} category={c.category} />)}
        </div>
      </section>

      {/* EDUCAÇÃO */}
      <CarouselDpad title="EDUCAÇÃO E UNIVERSIDADES">
        {mockContents.filter(c=>c.category==="Educação").map(c=> <div key={c.id} className="w-[300px] shrink-0 snap-start"><ProgramCard title={c.title} channel="TV UNAM · Universidade" time="22:11" category="Palestra" thumb={c.thumbnail} /></div>)}
        <div className="w-[300px] shrink-0 snap-start rounded-xl border border-dashed border-[#333] p-6 grid place-items-center text-sm text-[#8a8a8a]">+ Palestras, ciência e pesquisa</div>
      </CarouselDpad>

      {/* MÚSICA */}
      <CarouselDpad title="MÚSICA">
        {mockContents.filter(c=>c.category==="Música").map(c=> <div key={c.id} className="w-[300px] shrink-0 snap-start"><ContentCard content={c} /></div>)}
        <div className="w-[300px] shrink-0 snap-start rounded-xl border border-[#222] bg-[#141414] p-4"><p className="text-sm font-semibold text-white">Shows e festivais</p><p className="text-xs text-[#8a8a8a] mt-1">Concertos regionais em curadoria semanal.</p></div>
      </CarouselDpad>

      {/* POR PAÍS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-white">Explore por país</h2><Link href="/tv/paises" className="text-xs tracking-widest text-[#8a8a8a] hover:text-white">20 PAÍSES →</Link></div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
          {mockCountries.slice(0,10).map(c=> <CountryCard key={c.id} country={c} />)}
        </div>
      </section>

      {/* NOVOS CONTEÚDOS */}
      <CarouselDpad title="NOVOS CONTEÚDOS" action={<span className="text-xs text-[#6b6b6b]">Recentes primeiro (mock)</span>}>
        {[...mockContents].reverse().map(c=> <div key={c.id+"n"} className="w-[280px] shrink-0 snap-start"><ContentCard content={c} /></div>)}
      </CarouselDpad>

      <p className="text-xs text-[#5a5a5a]">Navegue com mouse, touch (swipe), teclado (Tab/Shift+Tab, setas, Enter, Esc, /, Space, F, M) ou D-pad (←→↑↓). Foco nunca desaparece — anel vermelho premium.</p>
    </div>
  );
}
