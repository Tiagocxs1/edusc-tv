"use client";
import { useRef, useState, useEffect } from "react";
import type { ContentSource } from "./types";
import { detectProvider, toEmbedUrl } from "./detectProvider";
import { YouTubePlayer } from "./providers/youtube";
import { VimeoPlayer } from "./providers/vimeo";
import { Html5Player } from "./providers/html5";
import { HLSPlayer } from "./providers/hls";
import { IframeProvider } from "./providers/iframe";
import { usePlayer } from "./PlayerContext";

function supportsPiP(){ return typeof document !== "undefined" && !!document.pictureInPictureEnabled; }
function supportsFullscreen(){ return typeof document !== "undefined" && !!document.fullscreenEnabled; }

export function UniversalPlayer({ source, aspect="16:9", autoPlay=false }: { source:ContentSource; aspect?: ContentSource["aspectRatio"]; autoPlay?:boolean }){
  const kind = source.provider !== "unknown" ? source.provider : detectProvider(source.sourceUrl || source.streamUrl || "");
  const embed = source.embedUrl || toEmbedUrl(source.sourceUrl, kind);
  const [started,setStarted]=useState(autoPlay);
  const [err,setErr]=useState<string|null>(null);
  const [levels,setLevels]=useState<string[]>([]);
  const containerRef=useRef<HTMLDivElement>(null);
  const playerState = usePlayer();

  // cleanup on unmount / source change
  useEffect(()=>{ return ()=>{ /* hls destroyed inside HLSPlayer */ }; },[source.id]);

  // poster lazy — only load player after user selects
  if(!started){
    return (
      <div className="group relative overflow-hidden bg-black" style={{ aspectRatio: aspect?.replace(":","/") ?? "16/9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={source.poster || source.thumbnail} alt={source.title} className="h-full w-full object-cover opacity-70" loading="lazy"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
        <button onClick={()=> setStarted(true)} className="absolute inset-0 grid place-items-center focus-visible:outline-none">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-black text-xl shadow-xl group-hover:scale-105 transition">▶</span>
        </button>
        <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-xs text-white border border-white/20">{kind.toUpperCase()} · {source.isLive ? "🔴 AO VIVO" : "VOD"}</span>
        <span className="absolute bottom-3 left-3 right-3 text-xs text-white/70">{source.title} — clique para carregar player (lazy)</span>
      </div>
    );
  }

  if(err){
    return (
      <div className="grid place-items-center gap-3 p-8 text-center bg-[#0f0f0f] border border-[#222] rounded-xl" style={{ aspectRatio: aspect?.replace(":","/") ?? "16/9" }}>
        <p className="font-semibold text-white">{err}</p>
        {source.sourceUrl && <a href={source.sourceUrl} target="_blank" rel="noreferrer" className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black">Assistir na plataforma original ↗</a>}
        <button onClick={()=>{ setErr(null); setStarted(false); }} className="text-xs text-[#8a8a8a] hover:text-white">Voltar ao poster</button>
      </div>
    );
  }

  const common = {
    onReady: ()=> playerState.setLoading(false),
    onError: (m:string)=> { setErr(m); playerState.setError(m); },
  };

  let inner: React.ReactNode;
  if(kind==="youtube") inner=<YouTubePlayer sourceUrl={source.sourceUrl} videoId={source.videoId} onReady={common.onReady} onError={common.onError}/>;
  else if(kind==="vimeo") inner=<VimeoPlayer sourceUrl={source.sourceUrl} videoId={source.videoId} onReady={common.onReady} onError={common.onError}/>;
  else if(kind==="hls" && source.streamUrl) inner=<HLSPlayer src={source.streamUrl} poster={source.poster} isLive={source.isLive} onReady={common.onReady} onError={common.onError} onLevels={setLevels} onTime={(t,d)=> playerState.setTime(t,d)}/>;
  else if(kind==="html5" && source.streamUrl) inner=<Html5Player src={source.streamUrl} poster={source.poster} onReady={common.onReady} onError={common.onError} onTime={(t,d)=> playerState.setTime(t,d)}/>;
  else if(kind==="iframe" && embed) inner=<IframeProvider src={embed} onReady={common.onReady} onError={common.onError}/>;
  else inner=<div className="grid place-items-center p-8 text-sm text-[#8a8a8a]">Não foi possível identificar a fonte deste conteúdo.<br/><a href={source.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-black">Assistir na fonte original ↗</a></div>;

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-xl border border-[#222] bg-black group/player" style={{ aspectRatio: aspect?.replace(":","/") ?? "16/9" }}>
      <div className="absolute inset-0">{inner}</div>
      {/* overlay controls — desktop/tv, hidden until hover/focus */}
      <PlayerChrome levels={levels} source={source} containerRef={containerRef} supportsPiP={supportsPiP()} supportsFs={supportsFullscreen()} />
      {source.isLive && <span className="absolute left-3 top-3 rounded bg-[#e50914] px-2 py-1 text-xs font-bold text-white">🔴 AO VIVO</span>}
    </div>
  );
}

function PlayerChrome({ source, containerRef, supportsPiP, supportsFs, levels }: { source:ContentSource; containerRef:React.RefObject<HTMLDivElement|null>; supportsPiP:boolean; supportsFs:boolean; levels:string[] }){
  const p=usePlayer();
  const [quality,setQuality]=useState("AUTO");
  const toggleFs=()=>{
    const el=containerRef.current;
    if(!el) return;
    if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});
    else el.requestFullscreen().catch(()=>{});
  };
  const togglePiP=async()=>{
    const v=document.querySelector("video") as HTMLVideoElement | null;
    if(!v) return;
    try{
      if(document.pictureInPictureElement) await document.exitPictureInPicture();
      else if(v.requestPictureInPicture) await v.requestPictureInPicture();
    }catch{}
  };
  // keyboard: Space/M/F/P/←→/Esc (ignore inputs)
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      const tag=(e.target as HTMLElement)?.tagName;
      if(tag==="INPUT"|| tag==="TEXTAREA") return;
      if(e.code==="Space"){ e.preventDefault(); p.setPlaying(!p.playing); }
      if(e.key.toLowerCase()==="m") p.setMuted(!p.muted);
      if(e.key.toLowerCase()==="f") toggleFs();
      if(e.key.toLowerCase()==="p" && supportsPiP) togglePiP();
      if(e.key==="ArrowRight") p.seek(Math.min(p.currentTime+10, p.duration|| Infinity));
      if(e.key==="ArrowLeft") p.seek(Math.max(p.currentTime-10,0));
      if(e.key==="Escape" && document.fullscreenElement) document.exitFullscreen().catch(()=>{});
    };
    window.addEventListener("keydown", onKey);
    return ()=> window.removeEventListener("keydown", onKey);
  },[p,supportsPiP]);

  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 opacity-0 group-hover/player:opacity-100 group-focus-within/player:opacity-100 transition focus-within:opacity-100 data-[tv=1]:opacity-100">
      {/* progress for VOD — not live */}
      {!source.isLive && (
        <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/20">
          <div className="h-full bg-[#e50914] transition-all" style={{ width: `${p.duration ? (p.currentTime/p.duration)*100 : 0}%` }}/>
        </div>
      )}
      <div className="flex items-center gap-2">
        <button aria-label={p.playing?"Pausar":"Reproduzir"} onClick={()=> p.setPlaying(!p.playing)} className="grid h-8 w-8 place-items-center rounded-full bg-white text-black text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">{p.playing?"❚❚":"▶"}</button>
        <span className="text-xs text-white tabular-nums">{source.isLive ? "🔴 AO VIVO" : `${Math.floor(p.currentTime/60)}:${String(Math.floor(p.currentTime%60)).padStart(2,"0")} / ${Math.floor((p.duration||0)/60)}:${String(Math.floor((p.duration||0)%60)).padStart(2,"0")}`}</span>
        <span className="ml-2 hidden sm:inline text-xs text-white/70 truncate">{source.title} · {source.provider.toUpperCase()}</span>
        <div className="ml-auto flex items-center gap-1">
          {levels.length>1 && (
            <select value={quality} onChange={e=>setQuality(e.target.value)} className="rounded-full border border-white/20 bg-black/40 px-2 py-1 text-xs text-white">
              {levels.map(l=> <option key={l} value={l}>{l}</option>)}
            </select>
          )}
          <button aria-label={p.muted?"Ativar som":"Silenciar"} onClick={()=> p.setMuted(!p.muted)} className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black text-xs">{p.muted?"🔇":"🔊"}</button>
          <button aria-label="Picture-in-Picture" disabled={!supportsPiP} onClick={togglePiP} className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black disabled:opacity-30 text-xs">▣</button>
          <button aria-label="Tela cheia" disabled={!supportsFs} onClick={toggleFs} className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black text-xs">⛶</button>
        </div>
      </div>
      {source.isLive && <button onClick={()=> p.seek(p.duration)} className="mt-2 rounded-full bg-[#e50914] px-3 py-1 text-xs font-bold text-white">VOLTAR AO AO VIVO</button>}
    </div>
  );
}
