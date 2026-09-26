"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { mockContents, mockMovies } from "@/lib/mock-data";
import { catalog as catalogData, persons, companies } from "@/lib/catalog/mockCatalog";
import { playlistFilms } from "@/lib/catalog/playlistFilms";
const allCatalog = [...catalogData, ...playlistFilms];
import { UniversalPlayer } from "@/lib/player/UniversalPlayer";
import { contentToSource } from "@/lib/player/toSource";
import { usePlayer } from "@/lib/player/PlayerContext";
import { VerticalCard } from "@/components/catalog/CatalogCard";

export default function Page({ params }: { params: Promise<{ slug:string }> }){
  const { slug } = use(params);
  const catItem = allCatalog.find(c=>c.slug===slug);
  const fallback = [...mockContents, ...mockMovies].find(c=>c.id===slug || c.title.toLowerCase().replace(/\s+/g,"-")===slug) ?? mockContents[0];
  const isCatalog = !!catItem;
  const title = catItem?.title ?? fallback.title;
  const backdrop = catItem?.backdrop ?? fallback.thumbnail;
  const poster = catItem?.poster ?? fallback.thumbnail;
  const year = catItem?.year ?? 2024;
  const duration = catItem ? `${catItem.durationMin} min` : (fallback as any).duration ?? "52 min";
  const country = catItem?.country ?? (fallback as any).countryId?.toUpperCase() ?? "BR";
  const category = catItem?.genres[0] ?? (fallback as any).category ?? "Cinema";
  const synopsis = catItem?.synopsis ?? (fallback as any).description;
  const sourceRaw = catItem ? { id:catItem.id, title:catItem.title, thumbnail:catItem.poster, url:catItem.source.sourceUrl } : { id:(fallback as any).id, title:fallback.title, thumbnail:fallback.thumbnail, url:(fallback as any).url };
  const source = contentToSource(sourceRaw as any, { isLive:false });
  const p = usePlayer();
  const [fav,setFav]=useState(false);
  useEffect(()=>{
    try{ const f=JSON.parse(localStorage.getItem("edusc:fav:catalog")||"[]"); setFav(f.includes(slug)); }catch{}
  },[slug]);
  useEffect(()=>{
    p.play(source);
    try{
      const h=JSON.parse(localStorage.getItem("edusc:history")||"[]");
      const entry={ contentId:slug, watchedAt:new Date().toISOString(), progress: p.currentTime };
      localStorage.setItem("edusc:history", JSON.stringify([entry, ...h.filter((x:any)=>x.contentId!==slug)].slice(0,50)));
    }catch{}
    return ()=>{ if(p.current?.id===source.id && p.playing) p.setMini(true); };
  },[slug]);
  const toggleFav=()=>{
    const key="edusc:fav:catalog";
    const cur= JSON.parse(localStorage.getItem(key)||"[]");
    const next= cur.includes(slug) ? cur.filter((x:string)=>x!==slug) : [...cur, slug];
    localStorage.setItem(key, JSON.stringify(next));
    setFav(!fav);
  };

  // relacionados: mesmo país / categoria / diretor / coleção
  const related = allCatalog.filter(c=> c.slug!==slug && (c.country===country || c.genres.includes(category) || (catItem && c.collectionIds.some(id=> catItem.collectionIds.includes(id))) || (catItem?.director && c.director===catItem.director))).slice(0,4);
  const moreCountry = allCatalog.filter(c=> c.country===country && c.slug!==slug).slice(0,4);
  const moreDirector = catItem?.director ? allCatalog.filter(c=> c.director===catItem.director && c.slug!==slug).slice(0,4) : [];

  const demos = [
    { label:"YouTube VOD", s: contentToSource({ id:"yt-demo", title:"YouTube — Demo VOD", thumbnail: poster, url:"https://www.youtube.com/watch?v=jNQXAC9IVRw" }) },
    { label:"Vimeo VOD", s: contentToSource({ id:"vm-demo", title:"Vimeo — Demo VOD", thumbnail: poster, url:"https://vimeo.com/76979871" }) },
    { label:"HLS", s: contentToSource({ id:"hls-demo", title:"HLS — Stream teste", thumbnail: poster, url:"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }) },
    { label:"HTML5 MP4", s: contentToSource({ id:"mp4-demo", title:"HTML5 — Big Buck Bunny", thumbnail: poster, url:"https://test-videos.co.uk/vids/sintel/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4" }) },
    { label:"Bloqueado", s: { id:"blocked", title:"Bloqueado — demo", provider:"iframe" as const, sourceUrl:"https://example.com/bloqueado", thumbnail: poster, isLive:false } as any },
  ];

  return (
    <div className="py-6 space-y-6">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-2xl border border-[#222] bg-[#0f0f0f]">
        <div className="absolute inset-0 opacity-35">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={backdrop} alt="" className="h-full w-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"/>
        </div>
        <div className="relative grid md:grid-cols-[280px_1fr] gap-6 p-4 md:p-6">
          <div className="overflow-hidden rounded-xl border border-[#222] bg-black aspect-[2/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt={title} className="h-full w-full object-cover"/>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-xs tracking-widest text-[#e50914] font-bold">{category.toUpperCase()} · {source.provider.toUpperCase()} · {catItem?.contentType ?? "video"}</p>
            <h1 className="mt-2 text-2xl md:text-3xl font-black text-white leading-tight">{title}</h1>
            {catItem?.originalTitle && <p className="text-sm text-[#8a8a8a]">Título original: {catItem.originalTitle}</p>}
            <p className="mt-2 text-sm text-[#8a8a8a]">{country} · {year} · {duration} · {catItem?.ageRating ?? "Classificação não informada"}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#d0d0d0] line-clamp-4">{synopsis}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={()=> p.setPlaying(true)} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black">▶ ASSISTIR</button>
              {catItem?.trailer && <a href={catItem.trailer} target="_blank" className="inline-flex rounded-full border border-white/20 bg-black/30 px-5 py-3 text-sm text-white backdrop-blur">▶ Trailer</a>}
              <button onClick={toggleFav} className={`inline-flex rounded-full border px-5 py-3 text-sm font-bold ${fav ? "bg-[#e50914] border-[#e50914] text-white" : "border-white/20 bg-black/30 text-white"}`}>{fav ? "♥ Na lista" : "♡ Minha lista"}</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#8a8a8a]">
              {catItem?.languages && <span className="rounded-full border border-[#333] bg-[#141414] px-2 py-1">Idioma: {catItem.languages.join(", ")}</span>}
              {catItem?.subtitles?.length ? <span className="rounded-full border border-[#333] bg-[#141414] px-2 py-1">Legendas: {catItem.subtitles.join(", ")}</span> : <span className="rounded-full border border-[#333] bg-[#141414] px-2 py-1">Sem legendas</span>}
              {catItem?.audioDescription && <span className="rounded-full border border-[#333] bg-[#141414] px-2 py-1">♿ Audiodescrição</span>}
            </div>
          </div>
        </div>
      </div>

      <UniversalPlayer source={source} aspect="16:9" />

      {/* Créditos e fonte */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-xl border border-[#222] bg-[#141414] p-4 space-y-3">
          <h3 className="font-bold text-white">Sinopse</h3>
          <p className="text-sm leading-relaxed text-[#d0d0d0]">{synopsis}</p>
          {catItem?.director && <p className="text-sm text-[#8a8a8a]">Direção: <Link href={`/tv/realizadores/${catItem.director.toLowerCase().replace(/\s+/g,"-")}`} className="text-white hover:underline">{catItem.director}</Link></p>}
          {catItem?.production && <p className="text-sm text-[#8a8a8a]">Produção: <Link href={`/tv/produtoras/${catItem.production.toLowerCase().replace(/\s+/g,"-")}`} className="text-white hover:underline">{catItem.production}</Link></p>}
          <div className="pt-3 border-t border-[#222]">
            <h4 className="text-xs tracking-widest font-bold text-[#8a8a8a]">CRÉDITOS E FONTE</h4>
            <p className="mt-1 text-xs text-[#6b6b6b]">Fonte: {catItem?.source.officialWebsite ?? source.sourceUrl} · Direitos: {catItem?.source.rightsStatus ?? "unknown"} · Acesso: {catItem?.source.accessType ?? "free"} · Embed: {catItem?.source.embedAllowed ? "permitido":"verificar"} · Verificado em {catItem?.source.checkedAt?.slice(0,10) ?? "—"}</p>
            <div className="mt-2 flex gap-2">
              <a href={catItem?.source.officialWebsite ?? source.sourceUrl} target="_blank" className="rounded-full border border-[#222] bg-[#0f0f0f] px-3 py-1 text-xs text-white hover:bg-white hover:text-black">Site oficial ↗</a>
              <a href={source.sourceUrl} target="_blank" className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">Assistir na fonte original ↗</a>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#222] bg-[#0f0f0f] p-4">
          <h3 className="text-sm font-bold text-white">Metadados</h3>
          <dl className="mt-2 space-y-1 text-xs text-[#8a8a8a]">
            <div><dt className="inline text-[#6b6b6b]">Duração: </dt><dd className="inline text-white">{duration}</dd></div>
            <div><dt className="inline">País/Região: </dt><dd className="inline text-white">{country}{catItem?.regions?.length ? ` · ${catItem.regions.join(", ")}`:""}</dd></div>
            <div><dt className="inline">Gêneros: </dt><dd className="inline text-white">{catItem?.genres.join(", ") || category}</dd></div>
            <div><dt className="inline">Idiomas: </dt><dd className="inline text-white">{catItem?.languages.join(", ") || "—"}</dd></div>
            <div><dt className="inline">Tags: </dt><dd className="inline text-white">{catItem?.tags.join(", ") || "—"}</dd></div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {demos.slice(0,3).map(d=> <button key={d.label} onClick={()=> p.play(d.s as any)} className="rounded-full border border-[#333] bg-[#141414] px-2 py-1 text-xs text-white hover:bg-white hover:text-black">{d.label}</button>)}
          </div>
        </div>
      </div>

      {related.length>0 && (
        <section className="space-y-3">
          <h2 className="font-bold text-white">Você também pode gostar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{related.map(c=> <VerticalCard key={c.id} item={c} />)}</div>
        </section>
      )}
      {moreCountry.length>0 && (
        <section className="space-y-3">
          <h2 className="font-bold text-white">Mais da {country}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{moreCountry.map(c=> <VerticalCard key={c.id} item={c} />)}</div>
        </section>
      )}
      {moreDirector.length>0 && (
        <section className="space-y-3">
          <h2 className="font-bold text-white">Mais de {catItem?.director}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{moreDirector.map(c=> <VerticalCard key={c.id} item={c} />)}</div>
        </section>
      )}

      <Link href="/tv" onClick={()=> p.setMini(true)} className="inline-flex text-sm text-[#8a8a8a] hover:text-white">← Voltar (vira mini-player)</Link>
    </div>
  );
}
