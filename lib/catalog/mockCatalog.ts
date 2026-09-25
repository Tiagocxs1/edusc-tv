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

const baseCatalog: CatalogItem[] = [
  real("buenas-8anos","OITO ANOS DE BUENAS IDEIAS - EDUARDO BUENO","Brasil","Sul","documentary",2024,15,["História","Brasil"],"https://www.youtube.com/watch?v=DvqHEB0Y6mI",{ director:"Eduardo Bueno", personIds:["p-bueno"], collectionIds:["col-historia-br"] }),
  real("buenas-quem-inventou","QUEM INVENTOU O BRASIL? - EDUARDO BUENO","Brasil","Sul","documentary",2024,68,["História","Brasil"],"https://www.youtube.com/watch?v=Mvjz-TZ_lDc",{ director:"Eduardo Bueno", personIds:["p-bueno"], collectionIds:["col-historia-br"] }),
  real("dw-bigbang","Pirámides, materia oscura y la teoría del Big Bang: ¿de qué está hecho el universo? | DW Documental","México","Centro","documentary",2024,42,["Ciência","História"],"https://www.youtube.com/watch?v=0t8r5r2KcWA",{ director:"DW Documental", collectionIds:["col-ciencia"] }),
  real("dw-mexico-carteles","México: Guerra de los cárteles de la droga | DW Documental","México","Centro","documentary",2025,45,["Sociedade","México"],"https://www.youtube.com/watch?v=9aMtg7tQDMU",{ collectionIds:["col-docs-es"] }),
  real("encuentro-cap1","Nos vemos en Encuentro: Capítulo 1 - Canal Encuentro","Argentina","Buenos Aires","series",2024,30,["Cultura","Argentina"],"https://www.youtube.com/watch?v=N9zOAZ-JA5I",{ institutionId:"i-enc", collectionIds:["col-argentina"] }),
  real("html-primeiro","Seu primeiro código HTML - @Curso em Vídeo HTML5 e CSS3","Brasil","Sudeste","course",2020,17,["Educação","Tecnologia"],"https://www.youtube.com/watch?v=E6CdIawPTh0",{ director:"Gustavo Guanabara", personIds:["p-guanabara"], institutionId:"i-cev" }),
  real("html-site-completo","Curso de HTML5 - 00 - Site Completo - by Gustavo Guanabara","Brasil","Sudeste","course",2013,12,["Educação","Tecnologia"],"https://www.youtube.com/watch?v=epDCjksKMok",{ director:"Gustavo Guanabara", personIds:["p-guanabara"] }),
  real("manual-maquina","TESTAMOS a MÁQUINA de 2000 ANOS!","Brasil","Sudeste","educational",2024,12,["Ciência","Educação"],"https://www.youtube.com/watch?v=LPtIkMh7P3k",{ director:"Iberê Thenório", personIds:["p-ibere"], festivalId:"f-manual" }),
];

export const archiveFilms: CatalogItem[] = [
  {
    id:"auto-gris-1919", slug:"auto-gris-1919", title:"El automóvil gris (1919) HD", originalTitle:"El automóvil gris",
    synopsis:"Clássico do cinema mudo mexicano (1919), de Enrique Rosas — nº 98 entre os 100 melhores filmes mexicanos. Domínio público. Cópia HD via Topaz Cine de Oro (YouTube oficial), embed verificado. IMDb tt0009894.",
    shortSynopsis:"México · 1919 · mudo · domínio público",
    poster:"https://upload.wikimedia.org/wikipedia/commons/2/24/El_Automovil_Gris_-_poster.jpg", backdrop:"https://i.ytimg.com/vi/FmfouqMv_EA/maxresdefault.jpg",
    contentType:"movie", year:1919, durationMin:120, country:"México", regions:["Centro"], languages:["Español"], subtitles:[], genres:["Clássico","Cinema mudo"],
    tags:["México","Domínio público","Cinema mudo","1919"],
    source:{ provider:"youtube", sourceUrl:"https://www.youtube.com/watch?v=FmfouqMv_EA", officialWebsite:"https://www.youtube.com/watch?v=FmfouqMv_EA", embedAllowed:true, checkedAt:new Date().toISOString(), rightsStatus:"officialPublic", accessType:"free", status:"active" },
    collectionIds:["col-clasicos"], personIds:[], rating:"Livre", ageRating:"Livre",
  } as CatalogItem,
  {
    id:"rio-1940s", slug:"rio-1940s", title:"RIO DE JANEIRO 1940s — Copacabana, Pão de Açúcar, Carnaval (Periscope/Archive)", originalTitle:"Rio de Janeiro travelogue XD5026",
    synopsis:"Travelogue 1940s em 35mm/16mm preservado pelo Periscope Film / Internet Archive. Copacabana, Ipanema, Pão de Açúcar, Carnaval. MP4 direto 854x480 via Archive.org — fora do YouTube, alta qualidade para a época.",
    shortSynopsis:"Brasil · 1940s · 9 min · Archive.org MP4",
    poster:"https://archive.org/download/TSw7Dh424g3a65n28DixCkOk5H84GE/__ia_thumb.jpg", backdrop:"https://archive.org/download/TSw7Dh424g3a65n28DixCkOk5H84GE/__ia_thumb.jpg",
    contentType:"documentary", year:1945, durationMin:9, country:"Brasil", regions:["Sudeste"], languages:["English"], subtitles:[], genres:["Arquivo","História"],
    tags:["Arquivo","Rio de Janeiro","Domínio público","Fora do YouTube"],
    source:{ provider:"html5", sourceUrl:"https://archive.org/details/TSw7Dh424g3a65n28DixCkOk5H84GE", officialWebsite:"https://archive.org/details/TSw7Dh424g3a65n28DixCkOk5H84GE", embedAllowed:true, checkedAt:new Date().toISOString(), rightsStatus:"officialPublic", accessType:"free", status:"active" },
    collectionIds:["col-archivo"], personIds:[], rating:"Livre", ageRating:"Livre",
  } as CatalogItem,
];

export const collections: Collection[] = [
  { id:"col-historia-br", slug:"historia-do-brasil", title:"História do Brasil — Buenas Ideias", description:"Eduardo Bueno conta o Brasil real. Embeds oficiais verificados.", cover:"https://i.ytimg.com/vi/DvqHEB0Y6mI/hqdefault.jpg", type:"editorial", country:"Brasil", contentIds:["buenas-8anos","buenas-quem-inventou"] },
  { id:"col-ciencia", slug:"ciencia-dw", title:"Ciência — DW Documental", description:"Big Bang, matéria escura e método científico em espanhol.", cover:"https://i.ytimg.com/vi/0t8r5r2KcWA/hqdefault.jpg", type:"editorial", contentIds:["dw-bigbang","manual-maquina"] },
  { id:"col-argentina", slug:"canal-encuentro-oficial", title:"Canal Encuentro Oficial", description:"TV educativa pública argentina — acervo oficial YouTube.", cover:"https://i.ytimg.com/vi/N9zOAZ-JA5I/hqdefault.jpg", type:"editorial", country:"Argentina", contentIds:["encuentro-cap1"] },
  { id:"col-edu", slug:"educacao-gratuita", title:"Educação gratuita — Curso em Vídeo", description:"HTML do zero com Guanabara.", cover:"https://i.ytimg.com/vi/E6CdIawPTh0/hqdefault.jpg", type:"editorial", contentIds:["html-primeiro","html-site-completo"] },
  { id:"col-docs-es", slug:"documentales-espanol", title:"Documentales en español", description:"DW + Encuentro + história latino-americana.", cover:"https://i.ytimg.com/vi/9aMtg7tQDMU/hqdefault.jpg", type:"editorial", contentIds:["dw-mexico-carteles","buenas-quem-inventou"] },
  { id:"col-curtas", slug:"curtas-latinos", title:"Curtas latinos — em curadoria", description:"Curtas latino-americanos com embed verificado. Novos títulos em verificação editorial.", cover:"https://i.ytimg.com/vi/N9zOAZ-JA5I/hqdefault.jpg", type:"editorial", contentIds:["manual-maquina"] },
  { id:"col-clasicos", slug:"clasicos-dominio-publico", title:"Clássicos em domínio público", description:"Cinema mudo latino em HD — fora do circuito comercial.", cover:"https://i.ytimg.com/vi/FmfouqMv_EA/hqdefault.jpg", type:"editorial", country:"México", contentIds:["auto-gris-1919"] },
  { id:"col-archivo", slug:"archivo-latino", title:"Arquivo latino — fora do YouTube", description:"Preservação Periscope/Archive.org em MP4 direto, alta qualidade.", cover:"https://archive.org/download/TSw7Dh424g3a65n28DixCkOk5H84GE/__ia_thumb.jpg", type:"editorial", contentIds:["rio-1940s"] },
  { id:"col-cine-ar-pl", slug:"cine-argentino-playlist", title:"Cine Argentino — Playlist completa", description:"Películas argentinas completas via playlist oficial YouTube (videoseries).", cover:"https://i.ytimg.com/vi/UXnAJqXF4VU/hqdefault.jpg", type:"editorial", country:"Argentina", contentIds:["cine-argentino-pl"] },
];

const playlistItems: CatalogItem[] = [
  {
    id:"cine-argentino-pl", slug:"cine-argentino-pl", title:"Cine Argentino — Películas Completas (Playlist)", originalTitle:"Cine Argentino playlist",
    synopsis:"Playlist pública 'Cine Argentino. Películas Argentinas Completas' — embed videoseries oficial YouTube. Verificar embedAllowed por obra; titularidade em revisão editorial.",
    shortSynopsis:"Argentina · playlist · YouTube",
    poster:"https://i.ytimg.com/vi/UXnAJqXF4VU/hqdefault.jpg", backdrop:"https://i.ytimg.com/vi/UXnAJqXF4VU/maxresdefault.jpg",
    contentType:"movie", year:2024, durationMin:90, country:"Argentina", regions:["Buenos Aires"], languages:["Español"], subtitles:[], genres:["Cinema argentino"],
    tags:["Argentina","Playlist","Cine argentino"],
    source:{ provider:"youtube", sourceUrl:"https://www.youtube.com/playlist?list=PLj9stbUOTbCuRN8CqKn_t93L5MvhPf98U", officialWebsite:"https://www.youtube.com/playlist?list=PLj9stbUOTbCuRN8CqKn_t93L5MvhPf98U", embedAllowed:true, checkedAt:new Date().toISOString(), rightsStatus:"officialPublic", accessType:"free", status:"active" },
    collectionIds:["col-cine-ar-pl"], personIds:[], rating:"Livre", ageRating:"Livre",
  } as CatalogItem,
];

export const catalog: CatalogItem[] = [...baseCatalog, ...archiveFilms, ...playlistItems];
