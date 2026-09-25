import type { SourceConnector } from "./base";
import type { DiscoveredItem } from "../types";
import { canonicalUrl } from "./base";
export const vimeoConnector: SourceConnector = {
  type:"vimeo",
  async discover(url:string){
    return [{ sourceId:"vimeo", externalId:"vimeo_demo_"+Date.now(), title:"Vimeo Showcase — Demo", description:"Demo vimeo", url:"https://vimeo.com/76979871", canonicalUrl: canonicalUrl("https://vimeo.com/76979871"), publishedAt:new Date().toISOString(), firstSeenAt:new Date().toISOString() }];
  },
  normalize(item){ return { title:item.title, description:item.description, url:item.url, canonicalUrl:item.canonicalUrl||canonicalUrl(item.url), publishedAt:item.publishedAt, externalId:item.externalId, provider:"vimeo", mediaType:"video" }; },
  validate(n){ return n.externalId ? {valid:true} : {valid:false, reason:"no id"}; }
};
