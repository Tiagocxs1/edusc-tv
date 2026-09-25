"use client";
import { useRef, useEffect } from "react";
export function Html5Player({ src, poster, onReady, onTime, onPlay, onPause, onEnded, onError }: { src:string; poster?:string; onReady?:()=>void; onTime?:(t:number,d:number)=>void; onPlay?:()=>void; onPause?:()=>void; onEnded?:()=>void; onError?:(m:string)=>void }){
  const ref=useRef<HTMLVideoElement>(null);
  useEffect(()=>{
    const v=ref.current; if(!v) return;
    const a=()=> onReady?.();
    const b=()=> onTime?.(v.currentTime, v.duration || 0);
    const c=()=> onPlay?.();
    const d=()=> onPause?.();
    const e=()=> onEnded?.();
    const f=()=> onError?.("Erro no vídeo");
    v.addEventListener("loadedmetadata", a);
    v.addEventListener("timeupdate", b);
    v.addEventListener("play", c);
    v.addEventListener("pause", d);
    v.addEventListener("ended", e);
    v.addEventListener("error", f);
    return ()=>{ v.removeEventListener("loadedmetadata", a); v.removeEventListener("timeupdate", b); v.removeEventListener("play", c); v.removeEventListener("pause", d); v.removeEventListener("ended", e); v.removeEventListener("error", f); };
  },[onReady,onTime,onPlay,onPause,onEnded,onError]);
  return <video ref={ref} src={src} poster={poster} controls autoPlay playsInline preload="metadata" className="h-full w-full bg-black" />;
}
