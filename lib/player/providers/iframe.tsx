"use client";
import { isAllowedUrl } from "../detectProvider";
export function IframeProvider({ src, onReady, onError }: { src:string; onReady?:()=>void; onError?:(m:string)=>void }){
  if(!isAllowedUrl(src)){
    return (
      <div className="grid place-items-center gap-3 p-8 text-center">
        <p className="text-sm font-semibold text-white">Este conteúdo não pode ser reproduzido incorporado.</p>
        <a href={src} target="_blank" rel="noreferrer" className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black">Assistir na plataforma original ↗</a>
      </div>
    );
  }
  return <iframe src={src} title="External player" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen loading="lazy" className="h-full w-full border-0" onLoad={()=> onReady?.()} onError={()=> onError?.("Falha no iframe")} />;
}
