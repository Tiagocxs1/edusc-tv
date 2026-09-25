import type { SourceConnector } from "./base";
import type { DiscoveredItem } from "../types";
import { canonicalUrl } from "./base";
export const websiteConnector: SourceConnector = {
  type:"website",
  async discover(url:string){
    try{
      const res=await fetch(url, { headers:{ "User-Agent":"EDUSC-TV/1.0 (+https://edusc.com.br/tv)" } } as any);
      if(!res.ok) throw new Error(String(res.status));
      const html=await res.text();
      // procura JSON-LD VideoObject
      const jsonLd=[...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).join("\n");
      // OpenGraph
      const ogTitle=(html.match(/property=["']og:title["'] content=["']([^"']+)["']/i)?.[1])||"";
      const ogImage=(html.match(/property=["']og:image["'] content=["']([^"']+)["']/i)?.[1])||"";
      // canonical
      const canonical=(html.match(/rel=["']canonical["'] href=["']([^"']+)["']/i)?.[1])||url;
      // RSS discovery
      const rss=(html.match(/rel=["']alternate["'][^>]*type=["']application\/rss\+xml["'][^>]*href=["']([^"']+)["']/i)?.[1])||"";
      if(ogTitle){
        return [{ sourceId:"website", externalId:canonicalUrl(canonical), title:ogTitle, description:"Descoberto via OpenGraph/JSON-LD", url:canonical, canonicalUrl:canonicalUrl(canonical), publishedAt:new Date().toISOString(), firstSeenAt:new Date().toISOString(), rawPayload: jsonLd.slice(0,2000) }];
      }
      if(rss) return [{ sourceId:"website", externalId:rss, title:"RSS descoberto", description:rss, url:rss, canonicalUrl:canonicalUrl(rss), publishedAt:new Date().toISOString(), firstSeenAt:new Date().toISOString() }];
      return [];
    }catch{
      return [];
    }
  },
  normalize(item){ return { title:item.title, description:item.description, url:item.url, canonicalUrl:item.canonicalUrl||canonicalUrl(item.url), publishedAt:item.publishedAt, externalId:item.externalId, provider:"website", mediaType:"video" }; },
  validate(n){ return n.url ? {valid:true} : {valid:false, reason:"no url"}; }
};
