"use client";
import { extractVimeoId } from "../detectProvider";
export function VimeoPlayer({ videoId, sourceUrl, autoPlay, onReady, onError }: { videoId?:string; sourceUrl:string; autoPlay?:boolean; onReady?:()=>void; onError?:(m:string)=>void }){
  const id = videoId || extractVimeoId(sourceUrl) || "";
  if(!id) return <div className="grid place-items-center p-8 text-sm text-[#8a8a8a]">Não foi possível identificar o vídeo do Vimeo.</div>;
  const embed = `https://player.vimeo.com/video/${id}?dnt=1&title=0&byline=0&portrait=0${autoPlay ? "&autoplay=1&muted=1" : ""}`;
  return <iframe src={embed} title="Vimeo player" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" className="h-full w-full border-0" onLoad={()=> onReady?.()} onError={()=> onError?.("Falha ao carregar Vimeo")} />;
}
