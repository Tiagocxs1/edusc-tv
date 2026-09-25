"use client";
import { use, useEffect, useState } from "react";
import { epgChannels } from "@/lib/epg/mockChannels";
import { UniversalPlayer } from "@/lib/player/UniversalPlayer";
import { contentToSource } from "@/lib/player/toSource";
import { usePlayer } from "@/lib/player/PlayerContext";
import { getCurrentItem, getNextItem, getProgram, progressOf, formatInTimezone } from "@/lib/epg/helpers";
import { useFavorites, useRecentChannels } from "@/lib/epg/useFavorites";
import Link from "next/link";

export default function Page({ params }: { params: Promise<{ slug:string }> }){
  const { slug } = use(params);
  const base = epgChannels.find(c=>c.slug===slug) ?? epgChannels[0];
  const [idx,setIdx]=useState(epgChannels.findIndex(c=>c.slug===base.slug));
  const cur = epgChannels[(idx+epgChannels.length)%epgChannels.length];
  const liveSource = contentToSource({ id: cur.id, title: `${cur.name} — Ao vivo`, thumbnail: cur.cover || `https://picsum.photos/seed/live-${cur.id}/800/450`, url: cur.source.url }, { isLive: cur.source.isLive });
  const p=usePlayer();
  const { fav, toggle, isFav } = useFavorites();
  const { push } = useRecentChannels();
  const [overlay,setOverlay]=useState(false);
  const [numBuf,setNumBuf]=useState("");

  const curItem=getCurrentItem(cur.schedule);
  const nextItem=getNextItem(cur.schedule);
  const curProg=curItem? getProgram(curItem.programId): null;
  const nextProg=nextItem? getProgram(nextItem.programId): null;
  const prog=progressOf(curItem);

  useEffect(()=>{ p.play(liveSource); push(cur.id); localStorage.setItem("edusc:lastChannel", cur.id); },[cur.id]);
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if((e.target as HTMLElement)?.tagName==="INPUT") return;
      if(e.key==="PageUp" || (e.key==="ArrowUp" && e.ctrlKey)) { setIdx(i=>i-1); setOverlay(true); setTimeout(()=>setOverlay(false),1800); }
      if(e.key==="PageDown" || (e.key==="ArrowDown" && e.ctrlKey)) { setIdx(i=>i+1); setOverlay(true); setTimeout(()=>setOverlay(false),1800); }
      if(/^[0-9]$/.test(e.key)){ setNumBuf(b=> (b+e.key).slice(0,2)); }
      if(e.key==="Enter" && numBuf){ const n=parseInt(numBuf,10); const found=epgChannels.findIndex(c=>c.channelNumber===n); if(found>=0) setIdx(found); setNumBuf(""); setOverlay(true); setTimeout(()=>setOverlay(false),1800); }
      if(e.key==="Escape") setNumBuf("");
    };
    window.addEventListener("keydown", onKey);
    return ()=> window.removeEventListener("keydown", onKey);
  },[numBuf]);

  const zap=(dir:1|-1)=>{ setIdx(i=>i+dir); setOverlay(true); setTimeout(()=>setOverlay(false),1800); };

  if(cur.status==="OFFLINE"){
    return (
      <div className="py-6 space-y-6">
        <div className="rounded-2xl border border-[#222] bg-[#0f0f0f] p-8 text-center">
          <p className="font-bold text-white">🔴 AO VIVO — Sinal temporariamente indisponível.</p>
          <p className="text-sm text-[#8a8a8a]">Tente novamente mais tarde.</p>
          <button onClick={()=> window.location.reload()} className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-bold text-black">Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      <div className="overflow-hidden rounded-2xl border border-[#222] bg-[#0f0f0f] relative">
        <UniversalPlayer source={liveSource} aspect="16:9" />
        {overlay && (
          <div className="absolute left-4 top-4 rounded-xl bg-black/80 border border-white/20 p-3 backdrop-blur">
            <p className="text-xs tracking-widest text-white/70">#{String(cur.channelNumber).padStart(2,"0")}</p>
            <p className="text-sm font-bold text-white">{cur.name}</p>
            <p className="text-xs text-white/70">🔴 AO VIVO · {curProg?.title ?? "Programação não disponível"}</p>
            {curItem && <p className="text-xs text-white/60">{formatInTimezone(curItem.start, cur.timezone)} — {formatInTimezone(curItem.end, cur.timezone)}</p>}
          </div>
        )}
        {numBuf && <div className="absolute right-4 top-4 rounded bg-white px-3 py-2 text-lg font-black text-black">{numBuf}</div>}
        <div className="absolute bottom-3 right-3 hidden sm:flex gap-2">
          <button onClick={()=>zap(-1)} className="rounded-full bg-black/60 border border-white/20 px-3 py-1 text-xs text-white hover:bg-white hover:text-black">CH- ↑</button>
          <button onClick={()=>zap(1)} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">CH+ ↓</button>
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#1f1f1f] px-2 py-1 text-xs font-black">#{String(cur.channelNumber).padStart(2,"0")}</span>
            <h1 className="text-xl font-black text-white">{cur.name}</h1>
            <span className={`rounded px-2 py-1 text-xs font-bold ${cur.status==="LIVE" ? "bg-[#e50914] text-white" : "bg-[#222] text-[#8a8a8a]"}`}>{cur.status==="LIVE" ? "🔴 AO VIVO" : cur.status==="SCHEDULED" ? "PRÓXIMO" : cur.status==="UNKNOWN" ? "STATUS INDISPONÍVEL" : cur.status}</span>
          </div>
          <p className="text-sm text-[#8a8a8a]">{cur.country.flag} {cur.country.name} · {cur.region} · {cur.city} · {cur.category} · {cur.timezone}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>toggle(cur.id)} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${isFav(cur.id) ? "bg-[#e50914] border-[#e50914] text-white" : "border-[#222] bg-[#141414] text-[#8a8a8a] hover:text-white"}`}>{isFav(cur.id) ? "★ Favorito" : "☆ Favoritar"}</button>
          <Link href="/tv/programacao" className="rounded-full border border-[#222] bg-[#141414] px-3 py-1.5 text-xs text-white hover:bg-white hover:text-black">Guia EPG</Link>
        </div>
      </div>

      {cur.schedule.length===0 ? (
        <div className="rounded-xl border border-[#222] bg-[#141414] p-4 text-sm text-[#8a8a8a]">🔴 AO VIVO — Programação não disponível. <a href={cur.website||"#"} target="_blank" className="text-white hover:underline">Confira o site oficial.</a></div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#222] bg-[#141414] p-4">
            <p className="text-xs tracking-widest text-[#e50914] font-bold">AGORA</p>
            {curProg && curItem ? <>
              <p className="text-sm font-bold text-white">{curProg.title}</p>
              <p className="text-xs text-[#8a8a8a]">{formatInTimezone(curItem.start, cur.timezone)} — {formatInTimezone(curItem.end, cur.timezone)} · {curProg.category}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#222]"><div className="h-full bg-[#e50914]" style={{ width:`${prog.pct}%` }}/></div>
              <p className="mt-1 text-xs text-[#6b6b6b]">{Math.round(prog.remaining/60000)} min restantes</p>
              <Link href={`/tv/filmes/${curProg.id}`} className="mt-3 inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black">▶ Assistir agora</Link>
            </> : <p className="text-sm text-[#8a8a8a]">Sem programa agora</p>}
          </div>
          <div className="rounded-xl border border-[#222] bg-[#0f0f0f] p-4">
            <p className="text-xs tracking-widest text-[#6b6b6b] font-bold">A SEGUIR</p>
            {nextProg && nextItem ? <>
              <p className="text-sm font-semibold text-white">{nextProg.title}</p>
              <p className="text-xs text-[#8a8a8a]">{formatInTimezone(nextItem.start, cur.timezone)} — {formatInTimezone(nextItem.end, cur.timezone)}</p>
              <p className="mt-1 text-xs text-[#8a8a8a]">{nextProg.description}</p>
              <button className="mt-2 rounded-full border border-[#222] bg-[#141414] px-3 py-1 text-xs text-[#8a8a8a]">🔔 Lembrar quando começar</button>
            </> : <p className="text-sm text-[#6b6b6b]">Sem próximo programa</p>}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[#222] bg-[#141414] p-4">
        <h3 className="font-semibold text-white">Sobre o canal</h3>
        <p className="mt-1 text-sm text-[#8a8a8a]">{cur.description}</p>
        <p className="mt-2 text-xs text-[#6b6b6b]">Qualidade: {cur.source.quality || "AUTO"} · 24h: {cur.is24h? "sim":"não"} · Fonte: {cur.source.provider} · {cur.source.url} {cur.source.isLive && "· live"}</p>
      </div>

      <div className="rounded-xl border border-[#222] bg-[#0f0f0f] p-4">
        <div className="flex items-center justify-between"><h3 className="font-semibold text-white">Programação de hoje</h3><span className="text-xs text-[#6b6b6b]">{cur.timezone}</span></div>
        <div className="mt-3 grid gap-2">
          {cur.schedule.map(it=>{
            const pr=getProgram(it.programId);
            const isNow=getCurrentItem(cur.schedule)?.id===it.id;
            return <div key={it.id} className={`flex items-center gap-3 rounded-lg border p-2 ${isNow?"bg-[#e50914] border-[#e50914] text-white":"bg-[#141414] border-[#222] text-white"}`}>
              <span className="text-xs font-bold w-14">{formatInTimezone(it.start, cur.timezone)}</span>
              <span className="text-sm font-medium flex-1">{pr?.title}</span>
              {isNow && <span className="text-xs font-bold">● AO VIVO</span>}
            </div>;
          })}
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={()=>zap(-1)} className="flex-1 rounded-full border border-[#222] bg-[#141414] py-3 text-sm font-bold text-white">‹ Canal anterior (PageUp / ↑)</button>
        <button onClick={()=>zap(1)} className="flex-1 rounded-full bg-white py-3 text-sm font-bold text-black">Canal seguinte (PageDown / ↓) ›</button>
      </div>
    </div>
  );
}
