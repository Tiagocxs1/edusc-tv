import type { CatalogItem } from "./types";
import { argflixTitles, argflixUrl } from "./argflix";
import { libreTitles } from "./libreflix";

function argItem(slug:string, title:string, synopsis:string, kind:string, year?:number): CatalogItem{
  const isSeries = /serie|minissérie/i.test(kind);
  return {
    id:`arg-${slug}`, slug:`arg-${slug}`, title, synopsis, shortSynopsis:`Argentina · ${kind} · Argflix`,
    poster:"", backdrop:"",
    contentType: isSeries ? "series" : "movie", year: year ?? 0, durationMin: 0,
    country:"Argentina", regions:["Buenos Aires"], languages:["Español"], subtitles:[],
    genres: kind==="Película" ? ["Cinema argentino"] : [kind],
    tags:["Argentina","Argflix",kind],
    source:{ provider:"external", sourceUrl:argflixUrl(slug), officialWebsite:argflixUrl(slug), embedAllowed:false, checkedAt:new Date().toISOString(), rightsStatus:"officialPublic", accessType:"external", status:"active" },
    collectionIds:[], personIds:[], rating:"", ageRating:"Classificação não informada",
  } as CatalogItem;
}

function libreItem(t:{ title:string; director:string; year:number; duration:number; synopsis:string; tags:string }): CatalogItem{
  const slug="libre-"+t.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").slice(0,40);
  const isDoc = /docs|document/i.test(t.tags);
  return {
    id:slug, slug, title:t.title, synopsis:t.synopsis, shortSynopsis:`${t.director} · ${t.year} · ${t.duration} min · Libreflix CC`,
    poster:"", backdrop:"",
    contentType: isDoc ? "documentary" : "movie", year:t.year, durationMin:t.duration,
    country:"Brasil", regions:["Sudeste"], languages:["Português"], subtitles:[],
    genres:["Cinema livre"],
    tags:["Brasil","Libreflix",...t.tags.split(" ")],
    source:{ provider:"external", sourceUrl:"https://libreflix.org/", officialWebsite:"https://libreflix.org/", embedAllowed:false, checkedAt:new Date().toISOString(), rightsStatus:"officialPublic", accessType:"external", status:"active" },
    collectionIds:[], personIds:[], rating:"", ageRating:"Classificação não informada",
  } as CatalogItem;
}

export const argflixCatalog: CatalogItem[] = argflixTitles.map(t=> argItem(t.slug, t.title, t.synopsis, t.kind));
export const libreflixCatalog: CatalogItem[] = libreTitles.map(libreItem);
export const fullExternalCatalog: CatalogItem[] = [...argflixCatalog, ...libreflixCatalog];
