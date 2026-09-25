"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export type HeroItem = { id:string; title:string; subtitle:string; description:string; backdrop:string; type:string; country:string; category:string; href:string; cta:string };

// Hero 100% real — hrefs batem com slugs do catálogo e do player
const ITEMS: HeroItem[] = [
  { id:"buenas-8anos", title:"OITO ANOS DE BUENAS IDEIAS - EDUARDO BUENO", subtitle:"HISTÓRIA · Brasil · 2024 · YouTube oficial", description:"Buenas Ideias 8 anos — embed oficial verificado. Clique e o mesmo vídeo abre no player.", backdrop:"https://i.ytimg.com/vi/DvqHEB0Y6mI/maxresdefault.jpg", type:"Documentário", country:"BR", category:"História", href:"/tv/filmes/buenas-8anos", cta:"Assistir agora" },
  { id:"dw-bigbang", title:"Pirámides, materia oscura y Big Bang | DW Documental", subtitle:"CIÊNCIA · DW Documental · 2024 · 42 min", description:"DW oficial — partículas, pirâmides e matéria escura. Mesmo ID no card e no player.", backdrop:"https://i.ytimg.com/vi/0t8r5r2KcWA/maxresdefault.jpg", type:"Documentário", country:"MX", category:"Ciência", href:"/tv/filmes/dw-bigbang", cta:"Assistir agora" },
  { id:"dw-espanol-live", title:"DW Español — En vivo 24h", subtitle:"AO VIVO · Notícias · Latinoamérica", description:"Sinal oficial DW Español 24h. Abre o canal com o mesmo stream.", backdrop:"https://i.ytimg.com/vi/yZh3xsFqCt8/maxresdefault.jpg", type:"Ao Vivo", country:"MX", category:"Notícias", href:"/tv/canais/dw-espanol", cta:"Assistir ao vivo" },
];

export function HeroDynamic(){
  const [idx,setIdx]=useState(0);
  const [paused,setPaused]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  const cur = ITEMS[idx];

  useEffect(()=>{
    if(paused) return;
    const t=setInterval(()=> setIdx(i=> (i+1)%ITEMS.length), 6000);
    return ()=> clearInterval(t);
  },[paused]);

  useEffect(()=>{
    const el=ref.current; if(!el) return;
    let sx=0;
    const onStart=(e:TouchEvent)=> sx=e.touches[0].clientX;
    const onEnd=(e:TouchEvent)=>{ const dx=e.changedTouches[0].clientX - sx; if(Math.abs(dx)>50) setIdx(i=> dx<0 ? (i+1)%ITEMS.length : (i-1+ITEMS.length)%ITEMS.length); };
    el.addEventListener("touchstart", onStart); el.addEventListener("touchend", onEnd);
    return ()=>{ el.removeEventListener("touchstart", onStart); el.removeEventListener("touchend", onEnd); };
  },[]);

  return (
    <div ref={ref} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} className="group relative overflow-hidden rounded-2xl border border-[#222] bg-black focus-within:ring-2 focus-within:ring-[#e50914]" tabIndex={0} aria-label="Destaques" onKeyDown={e=>{
      if(e.key==="ArrowRight") setIdx(i=> (i+1)%ITEMS.length);
      if(e.key==="ArrowLeft") setIdx(i=> (i-1+ITEMS.length)%ITEMS.length);
      if(e.key==="Enter") window.location.href=cur.href;
    }}>
      <div className="relative h-[56vh] min-h-[380px] max-h-[560px] md:h-[62vh]">
        {ITEMS.map((it,i)=> (
          <div key={it.id} className={`absolute inset-0 transition-opacity duration-700 ${i===idx ? "opacity-100" : "opacity-0"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.backdrop} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"/>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"/>
          </div>
        ))}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <p className="text-xs tracking-[0.18em] text-white/80">{cur.subtitle}</p>
          <h1 className="mt-2 max-w-3xl text-3xl md:text-5xl font-black leading-[0.95] text-white">{cur.title}</h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-white/80 line-clamp-2">{cur.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={cur.href} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:bg-[#e5e5e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">▶ {cur.cta}</Link>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white hover:text-black transition">＋ Minha lista</button>
          </div>
        </div>
        <button aria-label="Anterior" onClick={()=>setIdx(i=> (i-1+ITEMS.length)%ITEMS.length)} className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white border border-white/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition hover:bg-white hover:text-black">‹</button>
        <button aria-label="Próximo" onClick={()=>setIdx(i=> (i+1)%ITEMS.length)} className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white border border-white/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition hover:bg-white hover:text-black">›</button>
      </div>
      <div className="flex items-center justify-between bg-[#0f0f0f] px-4 py-3">
        <div className="flex gap-1.5" role="tablist" aria-label="Hero">
          {ITEMS.map((_,i)=> <button key={i} aria-label={`Ir para ${i+1}`} onClick={()=>setIdx(i)} className={`h-1.5 rounded-full transition-all ${i===idx ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/60"}`} />)}
        </div>
        <span className="text-xs text-[#6b6b6b]">{idx+1} / {ITEMS.length} · use ← → / swipe / D-pad</span>
      </div>
    </div>
  );
}
