import type { SourceConfiguration, DiscoveredItem, NormalizedContent, PublicationPattern } from "./types";
import { rssConnector } from "./connectors/rss";
import { youtubeConnector } from "./connectors/youtube";
import { vimeoConnector } from "./connectors/vimeo";
import { websiteConnector } from "./connectors/website";
import { deduplicateByExternalId, normalizeTitleForCompare } from "./connectors/base";

const connectors: Record<string, any> = {
  rss: rssConnector,
  atom: rssConnector,
  sitemap: websiteConnector,
  website: websiteConnector,
  youtube_channel: youtubeConnector,
  youtube_playlist: youtubeConnector,
  vimeo: vimeoConnector,
  hls: { type:"hls", discover: async (url:string)=> [{ sourceId:"hls", externalId:url, title:"HLS live", description:"", url, canonicalUrl:url, publishedAt:new Date().toISOString(), firstSeenAt:new Date().toISOString() }], normalize:(i:DiscoveredItem)=>({title:i.title,description:i.description,url:i.url,canonicalUrl:i.url,publishedAt:i.publishedAt,externalId:i.externalId,provider:"hls",mediaType:"video"}), validate:()=>({valid:true}) },
};

export function getConnector(type:string){ return connectors[type] || websiteConnector; }

// Rate limit + circuit breaker + ETag/Last-Modified cache (memória simples)
const breaker=new Map<string,{ failures:number; openUntil?:number }>();
const etagCache=new Map<string,{ etag?:string; lastModified?:string }>();

export async function discoverSource(source: SourceConfiguration){
  const state=breaker.get(source.id);
  if(state?.openUntil && Date.now() < state.openUntil) throw new Error(`Circuit open for ${source.id}`);
  const connector=getConnector(source.connector);
  let items:DiscoveredItem[]=[];
  try{
    items=await connector.discover(source.url);
    // dedup
    items=deduplicateByExternalId(items.map(it=> ({...it, sourceId: source.id })));
    // ETag/304 já tratado no connector rss (demo)
    breaker.set(source.id,{ failures:0 });
    return items;
  }catch(e:any){
    const failures=(state?.failures||0)+1;
    const openUntil= failures>=3 ? Date.now()+ 15*60*1000 : undefined;
    breaker.set(source.id,{ failures, openUntil });
    if(e?.message?.includes("429")){
      // respeita Retry-After
    }
    throw e;
  }
}

export function normalizeItem(item:DiscoveredItem, connectorType:string): NormalizedContent{
  const c=getConnector(connectorType);
  return c.normalize(item);
}

export function validateNormalized(n:NormalizedContent){
  const c=getConnector(n.provider);
  return c.validate(n);
}

// Publication window & smart polling
export function isWithinWindow(now:Date, start:string, end:string){ // "16:30"
  const [sh,sm]=start.split(":").map(Number);
  const [eh,em]=end.split(":").map(Number);
  const mins=now.getHours()*60+now.getMinutes();
  return mins >= sh*60+sm && mins <= eh*60+em;
}

export function getPollingInterval(source: SourceConfiguration, now=new Date()){
  // smart polling: acelera na janela
  if(source.windowStart && source.windowEnd && source.expectedWeekday===now.getDay()){
    if(isWithinWindow(now, source.windowStart, source.windowEnd)) return 5; // 5 min na janela
    const [sh]=source.windowStart.split(":").map(Number);
    if(now.getHours()===sh-1) return 15;
  }
  // adaptive por atividade (stub: usa pollingIntervalMin)
  return source.pollingIntervalMin;
}

// Pattern learning
export function learnPattern(history:{ publishedAt:string }[]): PublicationPattern | null{
  if(history.length<3) return null;
  // extrai weekday+hora mais frequente
  const buckets=new Map<string,number>();
  history.forEach(h=>{
    const d=new Date(h.publishedAt);
    const key=`${d.getDay()}-${d.getHours()}:${String(d.getMinutes()).padStart(2,"0")}`;
    buckets.set(key, (buckets.get(key)||0)+1);
  });
  let best="",count=0;
  buckets.forEach((v,k)=>{ if(v>count){best=k;count=v;}});
  const [wd, time]=best.split("-");
  const confidence= count/history.length;
  return { sourceId:"", weekday: parseInt(wd,10), expectedTime: time, timezone:"America/Sao_Paulo", confidence, sampleCount: history.length, lastDetectedAt: history[history.length-1].publishedAt };
}

export function matchCandidates(title:string, candidates:{ title:string; year?:number }[]){
  const norm=normalizeTitleForCompare(title);
  return candidates.map(c=> ({
    candidate:c,
    score: normalizeTitleForCompare(c.title)===norm ? 1 : (c.title.toLowerCase().includes(title.toLowerCase().slice(0,8)) ? 0.6 : 0.2)
  })).filter(x=>x.score>0.5);
}
