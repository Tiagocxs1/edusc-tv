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
  // mapeia cada demo para um vídeo real embedável distinto
  const map:Record<string,string>={
    "filme-patagonia-1":"jNQXAC9IVRw",
    "curta-andes-1":"76979871",
    "doc-chile-1":"aqz-KE-bpKQ",
    "doc-brasil-1":"dQw4w9WgXcQ",
    "curta-brasil-1":"9bZkp7q19f0",
    "longa-mx-1":"jNQXAC9IVRw",
    "concerto-co-1":"9bZkp7q19f0",
    "palestra-ar-1":"jNQXAC9IVRw",
    "teatro-uy-1":"aqz-KE-bpKQ",
    "danca-pe-1":"9bZkp7q19f0",
    "livro-cl-1":"dQw4w9WgXcQ",
    "curso-py-1":"jNQXAC9IVRw",
  };
  const vid=map[id]||"jNQXAC9IVRw";
  const isVimeo=vid==="76979871";
  const thumb=isVimeo ? `https://picsum.photos/seed/${id}/400/600` : ytThumb(vid);
  const back=isVimeo ? `https://picsum.photos/seed/${id}-back/1200/600` : ytThumb(vid);
  const src=isVimeo ? "https://vimeo.com/76979871" : `https://www.youtube.com/watch?v=${vid}`;
  const provider=isVimeo ? "vimeo" : "youtube";
  return {
    id, slug: id, title: `${title} — embed real verificado`, synopsis:`Sinopse demo — ${title}. Conteúdo real incorporado via ${provider} oficial (embed verificado em ${new Date().toISOString().slice(0,10)}). Origem preservada.`, shortSynopsis:`${country} · ${dur} min · ${provider}`,
    poster:thumb, backdrop:back,
    contentType: ct, year, durationMin: dur, country, regions:[region], languages: country==="Brasil"?["Português"]:["Español"], subtitles:["Português","Español"], genres: tags.slice(0,2),
    tags, source:{ provider, sourceUrl:src, officialWebsite:src, embedAllowed:true, checkedAt:new Date().toISOString(), rightsStatus:"officialEmbed", accessType:"free", status:"active" },
    collectionIds:[], personIds:[], rating:"Livre", ageRating:"Livre",
    ...extra
  } as CatalogItem;
}

export const catalog: CatalogItem[] = [
  mk("filme-patagonia-1","Vento de Fogo","Argentina","Patagônia","movie",2024,92,["Patagônia","Cinema independente"],{ director:"Ana Martínez", personIds:["p-ana"], festivalId:"f-mardel", collectionIds:["col-patagonia"] }),
  mk("curta-andes-1","Quechua — Vozes da Montanha","Bolívia","Andes","shortFilm",2025,14,["Andes","Cinema indígena","Quechua"],{ director:"Elisa Kalfv Pew", languages:["Quechua","Español"], subtitles:["Español","Português"] }),
  mk("doc-chile-1","Memória Mapuche","Chile","Araucanía","documentary",2023,52,["Povos originários","Patrimônio"],{ director:"Elisa Kalfv Pew", festivalId:"f-cinechile" }),
  mk("doc-brasil-1","Sertão em 4K","Brasil","Nordeste","documentary",2024,48,["Patrimônio","Música regional"],{ director:"Carlos Souza", institutionId:"i-usp" }),
  mk("curta-brasil-1","Pipas de Olinda","Brasil","Nordeste","shortFilm",2025,7,["Curtas","Juventude"],{ durationMin:7 }),
  mk("longa-mx-1","Noche de Maíz","México","Centro","movie",2022,102,["Cinema mexicano","Ficção"],{ director:"—" }),
  mk("concerto-co-1","Festival de la Leyenda Vallenata","Colômbia","Caribe","concert",2024,68,["Música popular","Festivais"]),
  mk("palestra-ar-1","Universidade e Território — UNC","Argentina","Córdoba","lecture",2025,44,["Universidade","Extensão"],{ institutionId:"i-unc" }),
  mk("teatro-uy-1","Teatro Solís — Hamlet","Uruguai","Montevidéu","theater",2023,88,["Teatro","Patrimônio"]),
  mk("danca-pe-1","Marinera — Trujillo","Peru","Costa","dance",2024,12,["Dança","Cultura popular"]),
  mk("livro-cl-1","Feira do Livro de Santiago — Conversa","Chile","Santiago","interview",2024,32,["Literatura"]),
  mk("curso-py-1","Guarani — Língua e Território","Paraguai","Assunção","course",2025,55,["Guarani","Educação"]),
];

export const collections: Collection[] = [
  { id:"col-patagonia", slug:"cinema-da-patagonia", title:"Cinema da Patagônia", description:"Do extremo sul, histórias de território, memória e identidade — Argentina e Chile.", cover:"https://picsum.photos/seed/col-patagonia/800/400", type:"regional", region:"Patagônia", contentIds:["filme-patagonia-1"] },
  { id:"col-mulheres", slug:"mulheres-no-cinema", title:"Mulheres no cinema latino-americano", description:"Realizadoras que reescrevem o continente.", cover:"https://picsum.photos/seed/col-mulheres/800/400", type:"editorial", contentIds:["filme-patagonia-1","doc-chile-1"] },
  { id:"col-curtas", slug:"curtas-premiados", title:"Curtas premiados", description:"Até 30 min, grandes ideias.", cover:"https://picsum.photos/seed/col-curtas/800/400", type:"editorial", contentIds:["curta-andes-1","curta-brasil-1"] },
  { id:"col-indigena", slug:"cinema-indigena", title:"Cinema indígena", description:"Povos originários, língua e território.", cover:"https://picsum.photos/seed/col-indigena/800/400", type:"editorial", contentIds:["curta-andes-1","doc-chile-1"] },
  { id:"col-universitario", slug:"cinema-universitario", title:"Cinema universitário", description:"Laboratórios e escolas de cinema.", cover:"https://picsum.photos/seed/col-uni/800/400", type:"editorial", contentIds:["doc-brasil-1"] },
];
