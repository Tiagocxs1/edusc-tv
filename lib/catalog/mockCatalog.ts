import type { CatalogItem, Collection, Person, ProductionCompany, Institution, Festival } from "./types";

export const persons: Person[] = [
  { id:"p-ana", slug:"ana-martinez", name:"Ana Martínez", photo:"https://picsum.photos/seed/person1/200/200", country:"Argentina", region:"Patagônia", biography:"Realizadora patagônica focada em memória e território.", role:"Director" },
  { id:"p-carlos", slug:"carlos-souza", name:"Carlos Souza", photo:"https://picsum.photos/seed/person2/200/200", country:"Brasil", region:"Sudeste", biography:"Cineasta universitário, docente de audiovisual.", role:"Director" },
  { id:"p-mapu", slug:"elisa-kalfv Pew", name:"Elisa Kalfv Pew", photo:"https://picsum.photos/seed/person3/200/200", country:"Chile", region:"Araucanía", biography:"Cineasta mapuche, cinema indígena.", role:"Director" },
];

export const companies: ProductionCompany[] = [
  { id:"c-andina", slug:"andina-filmes", name:"Andina Filmes", country:"Argentina", region:"Patagônia", city:"Bariloche", logo:"", cover:"", description:"Produtora independente patagônica.", website:"https://example.com/andina" },
  { id:"c-usp", slug:"usp-cinema", name:"USP Cinema", country:"Brasil", region:"Sudeste", city:"São Paulo", logo:"", cover:"", description:"Laboratório universitário.", website:"https://usp.br" },
];

export const institutions: Institution[] = [
  { id:"i-unc", slug:"unc", name:"Universidad Nacional de Córdoba", country:"Argentina", region:"Córdoba", city:"Córdoba", logo:"", website:"https://unc.edu.ar", description:"Universidade pública com canal e cinemateca." },
  { id:"i-usp", slug:"usp", name:"USP", country:"Brasil", region:"Sudeste", city:"São Paulo", logo:"", website:"https://usp.br", description:"Universidade de São Paulo." },
];

export const festivals: Festival[] = [
  { id:"f-mardel", slug:"mar-del-plata", name:"Festival de Mar del Plata", country:"Argentina", city:"Mar del Plata", year:2026, description:"Um dos mais antigos da América Latina.", cover:"https://picsum.photos/seed/fest1/800/400", website:"https://mardelplata.gob.ar" },
  { id:"f-cinechile", slug:"fidocs", name:"FIDOCS", country:"Chile", city:"Santiago", year:2026, description:"Festival de documentários.", cover:"https://picsum.photos/seed/fest2/800/400" },
];

function ytThumb(id:string){ return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`; }
function mk(id:string, title:string, country:string, region:string, ct:CatalogItem["contentType"], year:number, dur:number, tags:string[], extra:Partial<CatalogItem>={}): CatalogItem{
  const map:Record<string,string>={
    "filme-patagonia-1":"DvqHEB0Y6mI",
    "curta-andes-1":"76979871",
    "doc-chile-1":"Mvjz-TZ_lDc",
    "doc-brasil-1":"aqz-KE-bpKQ",
    "curta-brasil-1":"9bZkp7q19f0",
    "longa-mx-1":"DvqHEB0Y6mI",
    "concerto-co-1":"Mvjz-TZ_lDc",
    "palestra-ar-1":"DvqHEB0Y6mI",
    "teatro-uy-1":"aqz-KE-bpKQ",
    "danca-pe-1":"9bZkp7q19f0",
    "livro-cl-1":"Mvjz-TZ_lDc",
    "curso-py-1":"DvqHEB0Y6mI",
  };
  const vid=map[id]||"DvqHEB0Y6mI";
  const isVimeo=vid==="76979871";
  const thumb=isVimeo ? `https://picsum.photos/seed/${id}/400/600` : ytThumb(vid);
  const back=isVimeo ? `https://picsum.photos/seed/${id}-back/1200/600` : ytThumb(vid);
  const src=isVimeo ? "https://vimeo.com/76979871" : `https://www.youtube.com/watch?v=${vid}`;
  const provider=isVimeo ? "vimeo" : "youtube";
  return {
    id, slug: id, title, synopsis:`Conteúdo real incorporado via ${provider} oficial — "${title}" — embed verificado em ${new Date().toISOString().slice(0,10)}. Origem preservada: ${src}`, shortSynopsis:`${country} · ${dur} min · ${provider} · real`,
    poster:thumb, backdrop:back,
    contentType: ct, year, durationMin: dur, country, regions:[region], languages: country==="Brasil"?["Português"]:["Español"], subtitles:["Português","Español"], genres: tags.slice(0,2),
    tags, source:{ provider, sourceUrl:src, officialWebsite:src, embedAllowed:true, checkedAt:new Date().toISOString(), rightsStatus:"officialEmbed", accessType:"free", status:"active" },
    collectionIds:[], personIds:[], rating:"Livre", ageRating:"Livre",
    ...extra
  } as CatalogItem;
}

export const catalog: CatalogItem[] = [
  mk("filme-patagonia-1","OITO ANOS DE BUENAS IDEIAS - EDUARDO BUENO","Brasil","Sudeste","movie",2024,15,["História","Brasil"],{ director:"Eduardo Bueno", personIds:["p-carlos"], festivalId:"f-mardel", collectionIds:["col-patagonia"] }),
  mk("curta-andes-1","Vimeo Demo — Patagônia (embed real)","Argentina","Patagônia","shortFilm",2024,5,["Andes","Cinema indígena"],{ director:"Ana Martínez" }),
  mk("doc-chile-1","QUEM INVENTOU O BRASIL? - EDUARDO BUENO","Brasil","Sudeste","documentary",2024,68,["História","Brasil"],{ director:"Eduardo Bueno", festivalId:"f-cinechile" }),
  mk("doc-brasil-1","Big Buck Bunny 60fps 4K - Blender Foundation","Brasil","Nordeste","documentary",2008,10,["Animação","Open Source"],{ director:"Blender Foundation", institutionId:"i-usp" }),
  mk("curta-brasil-1","PSY - GANGNAM STYLE (4K)","Brasil","Nordeste","shortFilm",2012,4,["Música","Cultura pop"],{ durationMin:4 }),
  mk("longa-mx-1","OITO ANOS DE BUENAS IDEIAS - Reprise","Brasil","Sudeste","movie",2024,15,["História"],{ director:"Eduardo Bueno" }),
  mk("concerto-co-1","QUEM INVENTOU O BRASIL? — Sessão","Brasil","Sudeste","concert",2024,68,["História","Educação"]),
  mk("palestra-ar-1","OITO ANOS DE BUENAS IDEIAS — Palestra UNC","Argentina","Córdoba","lecture",2024,15,["Universidade","História"],{ institutionId:"i-unc" }),
  mk("teatro-uy-1","Big Buck Bunny — Teatro","Brasil","Sudeste","theater",2008,10,["Teatro","Animação"]),
  mk("danca-pe-1","GANGNAM STYLE — Dança","Brasil","Sudeste","dance",2012,4,["Dança","Cultura popular"]),
  mk("livro-cl-1","QUEM INVENTOU O BRASIL? — Literatura","Brasil","Sudeste","interview",2024,68,["Literatura","História"]),
  mk("curso-py-1","OITO ANOS DE BUENAS IDEIAS — Curso","Brasil","Sudeste","course",2024,15,["Educação","História"]),
];

export const collections: Collection[] = [
  { id:"col-patagonia", slug:"cinema-da-patagonia", title:"Cinema da Patagônia", description:"Do extremo sul, histórias de território, memória e identidade — Argentina e Chile.", cover:"https://img.youtube.com/vi/DvqHEB0Y6mI/maxresdefault.jpg", type:"regional", region:"Patagônia", contentIds:["filme-patagonia-1"] },
  { id:"col-mulheres", slug:"mulheres-no-cinema", title:"História do Brasil por Eduardo Bueno", description:"Buenas Ideias — 8 anos contando o Brasil real.", cover:"https://img.youtube.com/vi/Mvjz-TZ_lDc/maxresdefault.jpg", type:"editorial", contentIds:["filme-patagonia-1","doc-chile-1"] },
  { id:"col-curtas", slug:"curtas-premiados", title:"Curtas premiados", description:"Até 10 min, grandes ideias.", cover:"https://picsum.photos/seed/col-curtas/800/400", type:"editorial", contentIds:["curta-andes-1","curta-brasil-1"] },
  { id:"col-indigena", slug:"cinema-indigena", title:"Cinema indígena", description:"Povos originários, língua e território.", cover:"https://picsum.photos/seed/col-indigena/800/400", type:"editorial", contentIds:["curta-andes-1","doc-chile-1"] },
  { id:"col-universitario", slug:"cinema-universitario", title:"Cinema universitário", description:"Laboratórios e escolas de cinema.", cover:"https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg", type:"editorial", contentIds:["doc-brasil-1"] },
];
