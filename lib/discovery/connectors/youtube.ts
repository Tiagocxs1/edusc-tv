import type { SourceConnector } from "./base";
import type { DiscoveredItem } from "../types";
import { canonicalUrl } from "./base";

export const youtubeConnector: SourceConnector = {
  type:"youtube_channel",
  async discover(url:string){
    // Usa RSS do YouTube como fallback quando sem API key: https://www.youtube.com/feeds/videos.xml?channel_id=...
    // Aqui stub demo: simula 1 vídeo dentro da janela terça 17h
    const now=new Date();
    const isTuesday=now.getDay()===2;
    // simula detecção às 17:03 quando terça
    const items:DiscoveredItem[]=[
      { sourceId:"yt-unc", externalId:"yt_demo_"+Date.now(), title:`UNC — Programa semanal ${now.toLocaleDateString("pt-BR")}`, description:"Conteúdo detectado automaticamente (demo).", url:"https://www.youtube.com/watch?v=jNQXAC9IVRw", canonicalUrl: canonicalUrl("https://www.youtube.com/watch?v=jNQXAC9IVRw"), publishedAt: now.toISOString(), firstSeenAt: now.toISOString() },
    ];
    // se não for terça, retorna vazio para demonstrar "No new content detected"
    // mas para demo visual sempre retorna 1
    return items;
  },
  normalize(item:DiscoveredItem){
    return { title:item.title, description:item.description, url:item.url, canonicalUrl:item.canonicalUrl||canonicalUrl(item.url), publishedAt:item.publishedAt, externalId:item.externalId, provider:"youtube", mediaType:"video" };
  },
  validate(n){
    if(!n.externalId) return { valid:false, reason:"missing externalId" };
    return { valid:true };
  }
};
