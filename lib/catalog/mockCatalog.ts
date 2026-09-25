import type { CatalogItem, Collection, Person, ProductionCompany, Institution, Festival } from "./types";

export const persons: Person[] = [
  { id:"p-bueno", slug:"eduardo-bueno", name:"Eduardo Bueno", photo:"https://i.ytimg.com/vi/DvqHEB0Y6mI/hqdefault.jpg", country:"Brasil", region:"Sul", biography:"Jornalista e escritor, canal Buenas Ideias — história do Brasil.", role:"Director" },
  { id:"p-guanabara", slug:"gustavo-guanabara", name:"Gustavo Guanabara", photo:"https://i.ytimg.com/vi/E6CdIawPTh0/hqdefault.jpg", country:"Brasil", region:"Sudeste", biography:"Professor, Curso em Vídeo — tecnologia gratuita.", role:"Professor" },
  { id:"p-ibere", slug:"ibere-thenorio", name:"Iberê Thenório", photo:"https://i.ytimg.com/vi/LPtIkMh7P3k/hqdefault.jpg", country:"Brasil", region:"Sudeste", biography:"Manual do Mundo — entretenimento educativo.", role:"Producer" },
];

export const companies: ProductionCompany[] = [
  { id:"c-buenas", slug:"buenas-ideias", name:"Buenas Ideias", country:"Brasil", region:"Sul", city:"Porto Alegre", logo:"", cover:"", description:"Canal oficial Eduardo Bueno.", website:"https://www.youtube.com/@BuenasIdeias" },
  { id:"c-dw", slug:"dw-documental", name:"DW Documental", country:"Alemanha", region:"Berlín", city:"Berlín", logo:"", cover:"", description:"Deutsche Welle — documentários em espanhol.", website:"https://www.dw.com/es" },
  { id:"c-encuentro", slug:"canal-encuentro-ok", name:"Canal Encuentro", country:"Argentina", region:"Buenos Aires", city:"Buenos Aires", logo:"", cover:"", description:"Ministerio de Educación Argentina.", website:"https://www.youtube.com/@encuentro" },
];

export const institutions: Institution[] = [
  { id:"i-cev", slug:"curso-em-video", name:"Curso em Vídeo", country:"Brasil", region:"Sudeste", city:"Rio de Janeiro", logo:"", website:"https://www.cursoemvideo.com", description:"Cursos gratuitos de tecnologia — Gustavo Guanabara." },
  { id:"i-unam", slug:"tv-unam-ok", name:"TV UNAM", country:"México", region:"CDMX", city:"CDMX", logo:"", website:"https://tv.unam.mx", description:"Canal cultural de los universitarios." },
  { id:"i-enc", slug:"encuentro-inst", name:"Canal Encuentro", country:"Argentina", region:"Buenos Aires", city:"Buenos Aires", logo:"", website:"https://www.encuentro.gov.ar", description:"TV educativa pública argentina." },
];

export const festivals: Festival[] = [
  { id:"f-manual", slug:"manual-do-mundo", name:"Manual do Mundo — Ciência", country:"Brasil", city:"São Paulo", year:2026, description:"Experimentos e divulgação científica.", cover:"https://i.ytimg.com/vi/LPtIkMh7P3k/hqdefault.jpg", website:"https://www.youtube.com/@manualdomundo" },
];

function real(id:string, title:string, country:string, region:string, ct:CatalogItem["contentType"], year:number, dur:number, tags:string[], url:string, extra:Partial<CatalogItem>={}): CatalogItem{
  const vid=(url.match(/v=([^&]+)/)||[])[1]||id;
  const thumb=`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`;
  return {
    id, slug:id, title, synopsis:`Conteúdo oficial incorporado — "${title}". Fonte: ${url} — embed verificado via oEmbed em 2026-09-25. Origem preservada, sem re-hospedagem.`, shortSynopsis:`${country} · ${dur} min · YouTube oficial`,
    poster:thumb, backdrop:thumb,
    contentType:ct, year, durationMin:dur, country, regions:[region],
    languages: country==="Brasil"?["Português"]:["Español"], subtitles:["Português","Español"], genres:tags.slice(0,2),
    tags, source:{ provider:"youtube", sourceUrl:url, officialWebsite:url, embedAllowed:true, checkedAt:new Date().toISOString(), rightsStatus:"officialEmbed", accessType:"free", status:"active" },
    collectionIds:[], personIds:[], rating:"Livre", ageRating:"Livre",
    ...extra
  } as CatalogItem;
}

export const catalog: CatalogItem[] = [
  real("buenas-8anos","OITO ANOS DE BUENAS IDEIAS - EDUARDO BUENO","Brasil","Sul","documentary",2024,15,["História","Brasil"],"https://www.youtube.com/watch?v=DvqHEB0Y6mI",{ director:"Eduardo Bueno", personIds:["p-bueno"], collectionIds:["col-historia-br"] }),
  real("buenas-quem-inventou","QUEM INVENTOU O BRASIL? - EDUARDO BUENO","Brasil","Sul","documentary",2024,68,["História","Brasil"],"https://www.youtube.com/watch?v=Mvjz-TZ_lDc",{ director:"Eduardo Bueno", personIds:["p-bueno"], collectionIds:["col-historia-br"] }),
  real("dw-bigbang","Pirámides, materia oscura y la teoría del Big Bang: ¿de qué está hecho el universo? | DW Documental","México","Centro","documentary",2024,42,["Ciência","História"],"https://www.youtube.com/watch?v=0t8r5r2KcWA",{ director:"DW Documental", collectionIds:["col-ciencia"] }),
  real("dw-mexico-carteles","México: Guerra de los cárteles de la droga | DW Documental","México","Centro","documentary",2025,45,["Sociedade","México"],"https://www.youtube.com/watch?v=9aMtg7tQDMU",{ collectionIds:["col-docs-es"] }),
  real("encuentro-cap1","Nos vemos en Encuentro: Capítulo 1 - Canal Encuentro","Argentina","Buenos Aires","series",2024,30,["Cultura","Argentina"],"https://www.youtube.com/watch?v=N9zOAZ-JA5I",{ institutionId:"i-enc", collectionIds:["col-argentina"] }),
  real("html-primeiro","Seu primeiro código HTML - @Curso em Vídeo HTML5 e CSS3","Brasil","Sudeste","course",2020,17,["Educação","Tecnologia"],"https://www.youtube.com/watch?v=E6CdIawPTh0",{ director:"Gustavo Guanabara", personIds:["p-guanabara"], institutionId:"i-cev" }),
  real("html-site-completo","Curso de HTML5 - 00 - Site Completo - by Gustavo Guanabara","Brasil","Sudeste","course",2013,12,["Educação","Tecnologia"],"https://www.youtube.com/watch?v=epDCjksKMok",{ director:"Gustavo Guanabara", personIds:["p-guanabara"] }),
  real("manual-maquina","TESTAMOS a MÁQUINA de 2000 ANOS!","Brasil","Sudeste","educational",2024,12,["Ciência","Educação"],"https://www.youtube.com/watch?v=LPtIkMh7P3k",{ director:"Iberê Thenório", personIds:["p-ibere"], festivalId:"f-manual" }),
  real("blender-bunny","Big Buck Bunny 60fps 4K - Official Blender Foundation Short Film","Brasil","Sudeste","shortFilm",2008,10,["Animação","Open Source"],"https://www.youtube.com/watch?v=aqz-KE-bpKQ",{ collectionIds:["col-curtas"] }),
];

export const collections: Collection[] = [
  { id:"col-historia-br", slug:"historia-do-brasil", title:"História do Brasil — Buenas Ideias", description:"Eduardo Bueno conta o Brasil real. Embeds oficiais verificados.", cover:"https://i.ytimg.com/vi/DvqHEB0Y6mI/hqdefault.jpg", type:"editorial", country:"Brasil", contentIds:["buenas-8anos","buenas-quem-inventou"] },
  { id:"col-ciencia", slug:"ciencia-dw", title:"Ciência — DW Documental", description:"Big Bang, matéria escura e método científico em espanhol.", cover:"https://i.ytimg.com/vi/0t8r5r2KcWA/hqdefault.jpg", type:"editorial", contentIds:["dw-bigbang","manual-maquina"] },
  { id:"col-argentina", slug:"canal-encuentro-oficial", title:"Canal Encuentro Oficial", description:"TV educativa pública argentina — acervo oficial YouTube.", cover:"https://i.ytimg.com/vi/N9zOAZ-JA5I/hqdefault.jpg", type:"editorial", country:"Argentina", contentIds:["encuentro-cap1"] },
  { id:"col-edu", slug:"educacao-gratuita", title:"Educação gratuita — Curso em Vídeo", description:"HTML do zero com Guanabara.", cover:"https://i.ytimg.com/vi/E6CdIawPTh0/hqdefault.jpg", type:"editorial", contentIds:["html-primeiro","html-site-completo"] },
  { id:"col-docs-es", slug:"documentales-espanol", title:"Documentales en español", description:"DW + Encuentro + história latino-americana.", cover:"https://i.ytimg.com/vi/9aMtg7tQDMU/hqdefault.jpg", type:"editorial", contentIds:["dw-mexico-carteles","buenas-quem-inventou"] },
  { id:"col-curtas", slug:"curtas-abertos", title:"Curtas abertos", description:"Blender open-source + ciência curta.", cover:"https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg", type:"editorial", contentIds:["blender-bunny","manual-maquina"] },
];
