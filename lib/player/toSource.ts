import type { ContentSource } from "./types";
import { detectProvider, extractYouTubeId, extractVimeoId } from "./detectProvider";

const ARCHIVE_MP4: Record<string,string> = {
  "rio-1940s": "https://archive.org/download/TSw7Dh424g3a65n28DixCkOk5H84GE/tmpq_uzpwyt.mp4",
};

export function contentToSource(c: { id:string; title:string; thumbnail:string; provider?:string; source?:string; url:string; category?:string; isLive?:boolean }, opts?: Partial<ContentSource>): ContentSource {
  const url = c.url || "";
  let kind = (c.source as any) || detectProvider(url);
  // Archive.org details page -> usa MP4 direto oficial como html5 (alta qualidade, fora do YouTube)
  if(ARCHIVE_MP4[c.id]){
    return {
      id: c.id, title: c.title, provider: "html5", sourceUrl: url, videoId: undefined,
      streamUrl: ARCHIVE_MP4[c.id],
      thumbnail: c.thumbnail, poster: c.thumbnail,
      isLive: false, allowPiP: true, allowFullscreen: true, aspectRatio: "16:9",
      ...opts,
    };
  }
  const videoId = kind==="youtube" ? extractYouTubeId(url) || undefined : kind==="vimeo" ? extractVimeoId(url) || undefined : undefined;
  const streamUrl = kind==="hls" ? url : kind==="html5" ? url : undefined;
  return {
    id: c.id,
    title: c.title,
    provider: kind,
    sourceUrl: url,
    videoId,
    streamUrl,
    thumbnail: c.thumbnail,
    poster: c.thumbnail,
    isLive: c.isLive || opts?.isLive || false,
    allowPiP: true,
    allowFullscreen: true,
    aspectRatio: "16:9",
    ...opts,
  };
}
