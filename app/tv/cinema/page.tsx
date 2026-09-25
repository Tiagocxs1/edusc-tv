import Link from "next/link";
import { catalog, collections } from "@/lib/catalog/mockCatalog";
import { VerticalCard, CollectionCard } from "@/components/catalog/CatalogCard";

export default function Page(){
  const curtas=catalog.filter(c=>c.contentType==="shortFilm");
  const longas=catalog.filter(c=>c.contentType==="movie");
  const docs=catalog.filter(c=>c.contentType==="documentary");
  return (
    <div className="py-6 space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-[#222] bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://i.ytimg.com/vi/FmfouqMv_EA/maxresdefault.jpg" alt="El automóvil gris 1919" className="h-[280px] w-full object-cover opacity-60"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"/>
        <div className="absolute bottom-0 p-6 md:p-8">
          <p className="text-xs tracking-[0.2em] text-white/70">CINEMA LATINO-AMERICANO</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-black text-white leading-tight">Histórias produzidas de norte a sul do continente.</h1>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["Argentina","Brasil","Chile","México","Patagônia","Andes","Cone Sul"].map(t=> <Link key={t} href={`/tv/cinema/${t.toLowerCase()}`} className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-white backdrop-blur hover:bg-white hover:text-black">{t}</Link>)}
          </div>
        </div>
      </div>

      <section className="space-y-3"><div className="flex items-center justify-between"><h2 className="font-bold text-white">Filmes em destaque — só cinema, sem docs/cursos</h2><Link href="/tv/colecoes/clasicos-dominio-publico" className="text-xs text-[#8a8a8a] hover:text-white">Domínio público →</Link></div><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[...longas, ...curtas].slice(0,4).map(c=> <VerticalCard key={c.id} item={c} />)}</div></section>
      <section className="space-y-3"><h2 className="font-bold text-white">Curtas latino-americanos</h2>{curtas.length===0 ? <div className="rounded-xl border border-dashed border-[#333] p-6 text-sm text-[#8a8a8a]">Em curadoria — curtas latinos com embed verificado entram aqui. Sem Blender ou conteúdo não-latino.</div> : <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{curtas.map(c=> <VerticalCard key={c.id} item={c} />)}</div>}</section>
      <section className="space-y-3"><h2 className="font-bold text-white">Longas (só movie)</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{longas.map(c=> <VerticalCard key={c.id} item={c} />)}</div></section>
      <section className="space-y-3"><div className="flex items-center justify-between"><h2 className="font-bold text-white">Documentários ficam aqui — não no cinema</h2><Link href="/tv/documentarios" className="text-xs text-[#8a8a8a] hover:text-white">Ver docs →</Link></div><div className="grid md:grid-cols-2 gap-4">{docs.map(c=> <Link key={c.id} href={`/tv/filmes/${c.slug}`} className="rounded-xl border border-[#222] bg-[#141414] p-3 flex gap-3 hover:border-[#333]"><div className="h-20 w-32 rounded-lg bg-[#0f0f0f] overflow-hidden shrink-0"><img src={c.backdrop} alt="" className="h-full w-full object-cover"/></div><div><p className="text-sm font-semibold text-white">{c.title}</p><p className="text-xs text-[#8a8a8a]">{c.country} · {c.year}</p></div></Link>)}</div></section>
      <section className="space-y-3"><h2 className="font-bold text-white">Coleções editoriais</h2><div className="grid md:grid-cols-3 gap-4">{collections.map(col=> <CollectionCard key={col.id} col={col} />)}</div></section>
      <section className="rounded-xl border border-[#222] bg-[#141414] p-4">
        <h3 className="font-bold text-white">Cinema independente & universitário</h3>
        <p className="text-sm text-[#8a8a8a]">Foco em produtoras independentes, universidades e laboratórios. Filtre por país e região.</p>
        <div className="mt-3 flex flex-wrap gap-2">{["Brasil","Argentina","Chile","México","Patagonia"].map(p=> <Link key={p} href={`/tv/cinema/${p.toLowerCase()}`} className="rounded-full border border-[#222] bg-[#0f0f0f] px-3 py-1 text-xs text-white hover:bg-white hover:text-black">{p}</Link>)}</div>
      </section>
    </div>
  );
}
