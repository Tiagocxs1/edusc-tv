"use client";
import { extractYouTubeId, extractPlaylistId } from "../detectProvider";

export function YouTubePlayer({ videoId, sourceUrl, autoPlay, onReady, onPlay, onPause, onError }: { videoId?:string; sourceUrl:string; autoPlay?:boolean; onReady?:()=>void; onPlay?:()=>void; onPause?:()=>void; onError?:(m:string)=>void }){
  const id = videoId || extractYouTubeId(sourceUrl) || "";
  const list = extractPlaylistId(sourceUrl);
  // playlist sem vídeo específico: embed videoseries oficial (coleções)
  if(!id && list){
    const embedList = `https://www.youtube-nocookie.com/embed/videoseries?list=${list}&rel=0&modestbranding=1&playsinline=1${autoPlay ? "&autoplay=1&mute=1" : ""}`;
    return (
      <iframe src={embedList} title="YouTube playlist" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen loading="lazy" className="h-full w-full border-0" onLoad={()=> onReady?.()} onError={()=> onError?.("Falha ao carregar playlist")} />
    );
  }
  if(!id) return <div className="grid place-items-center p-8 text-sm text-[#8a8a8a]">Não foi possível identificar o vídeo do YouTube.</div>;
  const embed = `https://www.youtube-nocookie.com/embed/${id}?enablejsapi=0&rel=0&modestbranding=1&playsinline=1${list ? `&list=${list}` : ""}${autoPlay ? "&autoplay=1&mute=1" : ""}`;
  return (
    <iframe
      src={embed}
      title="YouTube player"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      allowFullScreen
      loading="lazy"
      className="h-full w-full border-0"
      onLoad={()=> onReady?.()}
      onError={()=> onError?.("Falha ao carregar YouTube")}
    />
  );
}
