import type { SourceConnector } from "./base";
import type { DiscoveredItem, NormalizedContent } from "../types";
import { canonicalUrl } from "./base";

export const rssConnector: SourceConnector = {
  type:"rss",
  async discover(url:string){
    // Light RSS parse via fetch + DOMParser (server: use fast-xml-parser when available)
    // Aqui stub: se não houver fetch, retorna mock para demo
    try{
      const res=await fetch(url, { headers:{ "If-None-Match":"", "If-Modified-Since":"" }, next:{ revalidate: 300 } as any });
      if(res.status===304) return [];
      if(!res.ok) throw new Error(`RSS ${res.status}`);
      const text=await res.text();
      // naive item extraction demo (real: use xml parser)
      const items:DiscoveredItem[]=[];
      const re=/<item>[\s\S]*?<\/item>/g;
      let m;
      while((m=re.exec(text))!==null){
        const block=m[0];
        const get=(tag:string)=> (block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))||[])[1]?.trim() || "";
        const link=get("link")||get("guid");
        if(!link) continue;
        items.push({
          sourceId:"rss", externalId: get("guid")||link, title: get("title")||"Sem título",
          description: get("description")||"", url: link, canonicalUrl: canonicalUrl(link),
          publishedAt: get("pubDate")|| new Date().toISOString(),
          firstSeenAt: new Date().toISOString(),
          rawPayload: block.slice(0,2000)
        });
      }
      return items.slice(0,50);
    }catch{
      // fallback demo
      return [
        { sourceId:"rss", externalId:"demo-rss-1", title:"Demo RSS — Documentário Patagônia", description:"Exemplo descoberto via RSS", url:"https://example.com/rss/1", canonicalUrl:"https://example.com/rss/1", publishedAt:new Date().toISOString(), firstSeenAt:new Date().toISOString() },
      ];
    }
  },
  normalize(item:DiscoveredItem):NormalizedContent{
    return { title:item.title, description:item.description, url:item.url, canonicalUrl:item.canonicalUrl||canonicalUrl(item.url), publishedAt:item.publishedAt, externalId:item.externalId, provider:"rss", mediaType:"video" };
  },
  validate(n:NormalizedContent){
    if(!n.title || !n.url) return { valid:false, reason:"missing title/url" };
    return { valid:true };
  }
};
