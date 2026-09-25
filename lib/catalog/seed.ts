// Seed demo — separa DEMO de PRODUCTION via flag isDemo
// Rodar futuramente com: npx tsx lib/catalog/seed.ts (quando DB ativo)
import { catalog, collections, persons, festivals } from "./mockCatalog";
import { epgChannels, epgCountries } from "../epg/mockChannels";

export const seedDemo = {
  countries: epgCountries,
  channels: epgChannels.map(c=> ({ ...c, isDemo:true })),
  contents: catalog.map(c=> ({ ...c, isDemo:true })),
  collections: collections.map(c=> ({ ...c, isDemo:true })),
  persons, festivals,
};

export function assertNoDuplicateProviderExternalId(items:{provider:string, externalId:string}[]){
  const seen=new Set<string>();
  for(const it of items){
    const k=`${it.provider}:${it.externalId}`;
    if(seen.has(k)) throw new Error(`Duplicate provider+externalId: ${k}`);
    seen.add(k);
  }
}
