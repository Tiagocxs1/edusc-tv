import type { SourceConfiguration } from "./types";
export const sourceRegistry: SourceConfiguration[] = [
  { id:"src-unc-youtube", name:"UNC — Universidad Nacional de Córdoba (YouTube)", url:"https://www.youtube.com/@unc", type:"youtube_channel", connector:"youtube_channel", enabled:true, priority:1, pollingIntervalMin:60, timezone:"America/Argentina/Buenos_Aires", expectedWeekday:2, expectedTime:"17:00", windowStart:"16:30", windowEnd:"18:30", autoPublish:false, autoSchedule:true, autoCategorize:true, trustLevel:"official", status:"healthy", failureCount:0 },
  { id:"src-futura-rss", name:"Canal Futura — RSS", url:"https://www.futura.org.br/feed", type:"rss", connector:"rss", enabled:true, priority:2, pollingIntervalMin:120, autoPublish:false, autoSchedule:false, autoCategorize:true, trustLevel:"trusted", status:"healthy", failureCount:0 },
  { id:"src-mardel-website", name:"Festival Mar del Plata — Website", url:"https://www.mardelplata.com", type:"website", connector:"website", enabled:true, priority:3, pollingIntervalMin:360, autoPublish:false, autoSchedule:false, autoCategorize:false, trustLevel:"reviewed", status:"unknown", failureCount:0 },
  { id:"src-hls-demo", name:"HLS Demo — Teste", url:"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", type:"hls", connector:"hls", enabled:false, priority:3, pollingIntervalMin:1440, autoPublish:false, autoSchedule:false, autoCategorize:false, trustLevel:"unknown", status:"unknown", failureCount:0 },
];
export function detectConnectorType(url:string): SourceConfiguration["type"]{
  if(url.includes("youtube.com")||url.includes("youtu.be")) return "youtube_channel";
  if(url.includes("vimeo.com")) return "vimeo";
  if(url.endsWith(".xml")||url.includes("sitemap")) return "sitemap";
  if(url.endsWith(".rss")||url.includes("/feed")) return "rss";
  if(url.includes(".m3u8")) return "hls";
  return "website";
}
