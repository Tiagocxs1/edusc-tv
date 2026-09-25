"use client";
import { useEffect, useRef, useState } from "react";
export function HLSPlayer({ src, poster, isLive, onReady, onTime, onError, onLevels }: { src:string; poster?:string; isLive?:boolean; onReady?:()=>void; onTime?:(t:number,d:number)=>void; onError?:(m:string)=>void; onLevels?:(levels:string[])=>void }){
  const ref=useRef<HTMLVideoElement>(null);
  const [levels,setLevels]=useState<string[]>([]);
  useEffect(()=>{
    const video=ref.current; if(!video) return;
    let hls:any=null;
    let destroyed=false;
    const setup = async ()=>{
      // nativo Safari
      if(video.canPlayType("application/vnd.apple.mpegurl")){
        video.src=src;
        onLevels?.(["AUTO"]);
        onReady?.();
        return;
      }
      const Hls = (await import("hls.js")).default;
      if(!Hls.isSupported()){
        onError?.("HLS não suportado neste navegador.");
        return;
      }
      hls=new Hls({ enableWorker:true, lowLatencyMode: !!isLive });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, ()=>{
        const l = hls.levels?.map((_:any,i:number)=> `${hls.levels[i].height || "?"}p`) ?? ["AUTO"];
        const uniq=[ "AUTO", ...l];
        setLevels(uniq);
        onLevels?.(uniq);
        onReady?.();
      });
      hls.on(Hls.Events.ERROR, (_:any,data:any)=>{
        if(data?.fatal) onError?.(data?.details || "Erro HLS");
      });
    };
    setup();
    const onTimeUpdate=()=> onTime?.(video.currentTime, video.duration || 0);
    const onErr=()=> onError?.("Erro no stream");
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("error", onErr);
    return ()=>{
      destroyed=true;
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("error", onErr);
      try{ hls?.destroy(); }catch{}
      video.removeAttribute("src");
      video.load();
    };
  },[src,isLive,onReady,onTime,onError,onLevels]);
  return <video ref={ref} poster={poster} controls autoPlay playsInline preload="metadata" className="h-full w-full bg-black" />;
}
