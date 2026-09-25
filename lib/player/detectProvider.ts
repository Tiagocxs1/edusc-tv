import type { ProviderKind } from "./types";

export const ALLOWLIST = [
  "youtube.com",
  "www.youtube.com",
  "youtu.be",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
  "vimeo.com",
  "player.vimeo.com",
];

export function isAllowedUrl(url:string){
  try{
    const u=new URL(url);
    return ALLOWLIST.some(d=> u.hostname===d || u.hostname.endsWith("."+d));
  }catch{ return false; }
}

export function extractYouTubeId(url:string):string|null{
  try{
    const u=new URL(url);
    if(u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0] || null;
    if(u.searchParams.get("v")) return u.searchParams.get("v");
    const m=u.pathname.match(/\/embed\/([^/?]+)/);
    if(m && m[1]!=="videoseries") return m[1];
    return null;
  }catch{ return null; }
}
export function extractPlaylistId(url:string):string|null{
  try{
    const u=new URL(url);
    const l=u.searchParams.get("list");
    if(l) return l;
    return null;
  }catch{ return null; }
}
export function extractVimeoId(url:string):string|null{
  try{
    const m=url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m? m[1]: null;
  }catch{ return null; }
}

export function detectProvider(url:string): ProviderKind{
  if(!url) return "unknown";
  const lo=url.toLowerCase();
  if(lo.includes("youtube.com") || lo.includes("youtu.be") || lo.includes("youtube-nocookie.com")) return "youtube";
  if(lo.includes("vimeo.com") || lo.includes("player.vimeo.com")) return "vimeo";
  if(lo.endsWith(".m3u8") || lo.includes(".m3u8")) return "hls";
  if(lo.endsWith(".mp4") || lo.endsWith(".webm") || lo.endsWith(".ogg")) return "html5";
  if(lo.startsWith("http")) return "iframe";
  return "unknown";
}

export function toEmbedUrl(url:string, kind:ProviderKind): string | undefined{
  if(kind==="youtube"){
    const list=extractPlaylistId(url);
    // playlist primeiro: embed videoseries oficial (coleções Argflix/ACAU)
    if(list && !extractYouTubeId(url)) return `https://www.youtube-nocookie.com/embed/videoseries?list=${list}&rel=0&modestbranding=1&playsinline=1`;
    const id=extractYouTubeId(url);
    if(id) return `https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1`;
    if(list) return `https://www.youtube-nocookie.com/embed/videoseries?list=${list}&rel=0&modestbranding=1&playsinline=1`;
  }
  if(kind==="vimeo"){
    const id=extractVimeoId(url);
    if(id) return `https://player.vimeo.com/video/${id}?dnt=1&title=0&byline=0`;
  }
  if(kind==="iframe" && isAllowedUrl(url)) return url;
  return undefined;
}
