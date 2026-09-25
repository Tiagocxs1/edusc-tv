import type { ContentSource } from "./types";
import { detectProvider, extractYouTubeId, extractVimeoId } from "./detectProvider";

export function contentToSource(c: { id:string; title:string; thumbnail:string; provider?:string; source?:string; url:string; category?:string; isLive?:boolean }, opts?: Partial<ContentSource>): ContentSource {
  const url = c.url || "";
  const kind = (c.source as any) || detectProvider(url);
  const videoId = kind==="youtube" ? extractYouTubeId(url) || undefined : kind==="vimeo" ? extractVimeoId(url) || undefined : undefined;
  // sample streams for demo when url empty — use public test streams
  const streamUrl = kind==="hls" ? url : kind==="html5" ? url : undefined;
  return {
    id: c.id,
    title: c.title,
    provider: kind,
    sourceUrl: url,
    videoId,
    streamUrl: streamUrl || (kind==="hls" ? "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" : kind==="html5" ? "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4" : undefined),
    thumbnail: c.thumbnail,
    poster: c.thumbnail,
    isLive: c.isLive || opts?.isLive || false,
    allowPiP: true,
    allowFullscreen: true,
    aspectRatio: "16:9",
    ...opts,
  };
}
