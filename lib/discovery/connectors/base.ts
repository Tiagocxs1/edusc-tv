import type { DiscoveredItem, NormalizedContent } from "../types";
export interface SourceConnector {
  type:string;
  discover(url:string):Promise<DiscoveredItem[]>;
  normalize(item:DiscoveredItem):NormalizedContent;
  validate(n:NormalizedContent): { valid:boolean; reason?:string };
}
export function normalizeTitleForCompare(t:string){
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();
}
export function canonicalUrl(url:string){
  try{
    const u=new URL(url);
    ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"].forEach(k=>u.searchParams.delete(k));
    return u.toString();
  }catch{ return url; }
}
export function deduplicateByExternalId(items:DiscoveredItem[]){
  const seen=new Set<string>();
  return items.filter(it=>{ const k=`${it.sourceId}:${it.externalId}`; if(seen.has(k)) return false; seen.add(k); return true; });
}
