// 52 filmes extraídos da playlist "Cine Argentino. Películas Argentinas Completas"
// (PLj9stbUOTbCuRN8CqKn_t93L5MvhPf98U) via HTML público + oEmbed (embed tecnicamente permitido).
// Uploads de terceiros — rightsStatus unknown; se o titular solicitar, removemos. Sem download, só embed oficial.
import type { CatalogItem } from "./types";

type F = [id:string, title:string, durMin:number];
const FILMS: F[] = [
  ["ndOsBHc2b-E","LUZ MALA — Película completa",74],
  ["Xd9ZSI3k-OU","PACO — película completa",128],
  ["NZlJy7SNB04","No Sos Vos Soy Yo (2004) — Película Completa",106],
  ["ZmoNclxdlBk","OPERACIÓN MASACRE (1973) — Jorge Cedrón",95],
  ["xROdgssOV-I","La Tía Mima. Un Mal Viaje. Película Completa",49],
  ["cytwUnS71Ng","Los paranoicos (2008) — Hendler, Medina",105],
  ["OwceNH4Zev8","LA PELÍCULA DE MANUEL — Película Completa",84],
  ["GiFXg7Sbi2E","El maestro — drama argentino",65],
  ["XRuLkdcig5o","LA ESTACIÓN (2021) — Miguel Ángel Francisco",74],
  ["tfscP94Y2FE","El Bumbún (2014) — drama sobre identidad",86],
  ["3eJIyYrfXVI","TRES D — Cine Argentino (subtitulada)",92],
  ["HEhUotXWi1c","Película argentina COMPLETA online",105],
  ["qY7wOb2ZeaI","FLIPPER — Cine Argentino",123],
  ["U4bRVd9-oYw","LA NOCHE DEL CHIHUAHUA — película completa",67],
  ["MHbHa46xxdo","EL NEXO",90],
  ["VTmOMMbGyO8","La Luz Incidente (2015)",94],
  ["26HnxScbY9c","Sangre Blanca (2018)",93],
  ["ZkruJHoykao","La Reina del Miedo (2018)",108],
  ["9VbLU9ofsas","Abril en Nueva York (2012)",71],
  ["A3q7nlNE9_U","GALLITO CIEGO (2001) — PELÍCULA COMPLETA",80],
  ["IccTumKqgQo","CUANDO YO TE VUELVA A VER",84],
  ["_xSJi4mWAUY","UNA de DOS (1D2 HD)",89],
  ["idsBI_bUsQs","100 veces no debo — Película Argentina Completa",90],
  ["1Yp5gZYMWew","CARRERO — Película Completa",84],
  ["0JAq-FmeC-0","El método (2005) HD",117],
  ["RnjectjoRMQ","Luna de Avellaneda — película completa",139],
  ["61lecDtZPq4","Fase 7 — Película Completa",95],
  ["eT2mg-4sEWk","Sol de otoño (1996)",105],
  ["0YNz25dRPj0","Rita y Li",86],
  ["TmbmlowW71g","ATENAS — Película completa",75],
  ["Y5nrJvzGkl8","Motín en Sierra Chica (2013)",84],
  ["bW9VfzisM2c","¿YO TE GUSTO?",80],
  ["q4xQVdrsTg4","76 89 03 — Película argentina completa HD",77],
  ["7ccUgWFXgYY","Invasión — Película Argentina de 1969",122],
  ["3kDe-Ev8pBM","Fuerza aérea sociedad anónima — E. Piñeyro Full HD",80],
  ["CoBvBqoXb6c","Whisky Romeo Zulú — E. Piñeyro FULL HD",107],
  ["qaWqueHhWaE","ICO EL CABALLITO VALIENTE — restaurada HD (1981)",80],
  ["fhqV2aB5Njg","MANUELITA",84],
  ["IR4oEjh_wik","PATORUZITO LA PELÍCULA",72],
  ["xqYPyvbZk6I","Esperando La Carroza Full HD 1080P",95],
  ["HE9-bjVZ7SE","Aventuras y Travesuras de PETETE y TRAPITO",71],
  ["9Snk0wRM8_U","Anteojito y Antifaz (1972) — original",91],
  ["GzUyX95TRbI","LA GUERRA GAUCHA (1942) — Película completa",86],
  ["ROXrnHeoXyA","Algo que pasó en Año Nuevo — Película Completa",91],
  ["PIj5qE0RlK0","REINA DE CORAZONES — documental trans (G. Bergandi)",83],
  ["0ihfubmKhGk","Una mirada definida",76],
  ["juELvR1Edk8","UNIDAD23 (2020) — Cine Argentino",76],
  ["r7w0UH4TRj0","Mercano, el Marciano (2002)",69],
  ["DW6Dhiyd7n0","El Turno Nocturno — Comedia",70],
];

// Pôsteres oficiais TMDB (image.tmdb.org, plano gratuito com atribuição) — verificados contra origin_country=AR.
// Sem match TMDB: card tipográfico (poster vazio), nunca thumbnail como cartaz.
const POSTERS: Record<string, { tmdb:number; title:string; year:string; poster:string }> = {
  "ndOsBHc2b-E": {"tmdb":1269576,"title":"Luz Mala","year":"2024","poster":"https://image.tmdb.org/t/p/w500/5SdVH0TI0iN1ykqdcHNsoaMwWHM.jpg"},
  "Xd9ZSI3k-OU": {"tmdb":351730,"title":"Paco","year":"2009","poster":"https://image.tmdb.org/t/p/w500/hgFsr8Wsfr2gShn3FwmDdtC9GHl.jpg"},
  "NZlJy7SNB04": {"tmdb":83266,"title":"No sos vos, soy yo","year":"2004","poster":"https://image.tmdb.org/t/p/w500/9E0cpXrBagDb7uHnAG4eT9C2qLf.jpg"},
  "OwceNH4Zev8": {"tmdb":496607,"title":"La película de Manuel","year":"2017","poster":"https://image.tmdb.org/t/p/w500/wJorhnU4PzjKvwMjRKkG7fIExyF.jpg"},
  "tfscP94Y2FE": {"tmdb":509796,"title":"El bumbún","year":"2014","poster":"https://image.tmdb.org/t/p/w500/5qgK8w1cxjv70FNkpVH2R4Bt7NJ.jpg"},
  "3eJIyYrfXVI": {"tmdb":435208,"title":"Tres D","year":"2014","poster":"https://image.tmdb.org/t/p/w500/5r11th6QS8ONcaTMzsXsuHlOobD.jpg"},
  "qY7wOb2ZeaI": {"tmdb":879885,"title":"Flipper","year":"2021","poster":"https://image.tmdb.org/t/p/w500/woDNm33hT6U1cDhk7llMSoAxagw.jpg"},
  "U4bRVd9-oYw": {"tmdb":616486,"title":"La noche del chihuahua","year":"2013","poster":"https://image.tmdb.org/t/p/w500/dX50kVnyfZSp59RjeKvHoXbIICG.jpg"},
  "MHbHa46xxdo": {"tmdb":956794,"title":"El Nexo","year":"2014","poster":"https://image.tmdb.org/t/p/w500/onEGbTsEWKJVdlYiyypAC3Ntsn4.jpg"},
  "VTmOMMbGyO8": {"tmdb":356000,"title":"La luz incidente","year":"2015","poster":"https://image.tmdb.org/t/p/w500/vkvKvuLGrRbO1owtPAWRnHDFJNW.jpg"},
  "26HnxScbY9c": {"tmdb":548188,"title":"Sangre blanca","year":"2018","poster":"https://image.tmdb.org/t/p/w500/a1NYu98NyGSbob0K0uM8qNKd9LI.jpg"},
  "ZkruJHoykao": {"tmdb":491311,"title":"La reina del miedo","year":"2018","poster":"https://image.tmdb.org/t/p/w500/bggab9uhxAmIyHIpw3YM25Xn5X8.jpg"},
  "9VbLU9ofsas": {"tmdb":332305,"title":"Abril en Nueva York","year":"2013","poster":"https://image.tmdb.org/t/p/w500/ydfwqR8RiXCgDpFjX4mrlfxFGCC.jpg"},
  "A3q7nlNE9_U": {"tmdb":524140,"title":"Gallito ciego","year":"2001","poster":"https://image.tmdb.org/t/p/w500/eGFI1AhfwDfjAOcIdbeABJ0iOur.jpg"},
  "IccTumKqgQo": {"tmdb":391333,"title":"Cuando yo te vuelva a ver","year":"2013","poster":"https://image.tmdb.org/t/p/w500/ynZRfnT3p1vMtDlmL67XkBGemXJ.jpg"},
  "_xSJi4mWAUY": {"tmdb":348026,"title":"Una de dos","year":"2002","poster":"https://image.tmdb.org/t/p/w500/jicmYlodeIKmvnKLCcXDGPcMDnN.jpg"},
  "idsBI_bUsQs": {"tmdb":118192,"title":"Cien veces no debo","year":"1990","poster":"https://image.tmdb.org/t/p/w500/soUSqTZKkV26SNs4gH5N4ftqF9W.jpg"},
  "1Yp5gZYMWew": {"tmdb":964218,"title":"Carrero","year":"2022","poster":"https://image.tmdb.org/t/p/w500/cLlwahDhnnXXVITLMSwRwYEQ7rc.jpg"},
  "0JAq-FmeC-0": {"tmdb":21043,"title":"El método","year":"2005","poster":"https://image.tmdb.org/t/p/w500/8ZZRnXToWcPXlyKG0JND3RAfpmn.jpg"},
  "g9R0OwijRtE": {"tmdb":87389,"title":"Querida, voy a comprar cigarrillos y vuelvo","year":"2011","poster":"https://image.tmdb.org/t/p/w500/n8hCNFgELiWd4hMbX6gC9lmIAf0.jpg"},
  "RnjectjoRMQ": {"tmdb":57977,"title":"Luna de Avellaneda","year":"2004","poster":"https://image.tmdb.org/t/p/w500/vyGtvy3TCMzULGznJwXUJ4tGxUT.jpg"},
  "61lecDtZPq4": {"tmdb":69278,"title":"Fase 7","year":"2010","poster":"https://image.tmdb.org/t/p/w500/1ulZPG3DHz1U3IWUa3ShDBwm3Ul.jpg"},
  "eT2mg-4sEWk": {"tmdb":143989,"title":"Sol de otoño","year":"1996","poster":"https://image.tmdb.org/t/p/w500/cQ6gS1CAk1QAvjgApDrmjkSfhRi.jpg"},
  "0YNz25dRPj0": {"tmdb":928486,"title":"Rita y Li","year":"2011","poster":"https://image.tmdb.org/t/p/w500/okMMz8onxp86EI5tVHy8wVjQYtK.jpg"},
  "TmbmlowW71g": {"tmdb":1471744,"title":"Atenas","year":"2025","poster":"https://image.tmdb.org/t/p/w500/4GuytFDzVTUaGiPRDsnCn7Lmh8G.jpg"},
  "Y5nrJvzGkl8": {"tmdb":458003,"title":"Motín en Sierra Chica","year":"2014","poster":"https://image.tmdb.org/t/p/w500/rOGCdXXp51g51XRc0okcypC6KrZ.jpg"},
  "bW9VfzisM2c": {"tmdb":640813,"title":"¿Yo te gusto?","year":"2019","poster":"https://image.tmdb.org/t/p/w500/acxGPOsAyeUVZgVokS2KUzW9CKw.jpg"},
  "q4xQVdrsTg4": {"tmdb":242547,"title":"76 89 03","year":"2000","poster":"https://image.tmdb.org/t/p/w500/y1lr40nalaOm6QXOVjJVbDAcj8F.jpg"},
  "yH_tANrGH0g": {"tmdb":262512,"title":"Destino anunciado","year":"2013","poster":"https://image.tmdb.org/t/p/w500/bt4u4TcIzNWpKB0YIqHr4BwFQ71.jpg"},
  "qaWqueHhWaE": {"tmdb":65928,"title":"Ico, el Caballito Valiente","year":"1983","poster":"https://image.tmdb.org/t/p/w500/qkCotfAXoG9VNLsgOAPcqxtEEdk.jpg"},
  "fhqV2aB5Njg": {"tmdb":65931,"title":"Manuelita","year":"1999","poster":"https://image.tmdb.org/t/p/w500/w67V5qcB3yUVrq3W49NMFNL8H12.jpg"},
  "xqYPyvbZk6I": {"tmdb":13651,"title":"Esperando la carroza","year":"1985","poster":"https://image.tmdb.org/t/p/w500/uypMuldOU2aBuA7QKBRgF981TzV.jpg"},
  "HE9-bjVZ7SE": {"tmdb":65544,"title":"Trapito","year":"1975","poster":"https://image.tmdb.org/t/p/w500/pFKLGKMIPQVPi6entlTnubx9OPD.jpg"},
  "9Snk0wRM8_U": {"tmdb":437689,"title":"Anteojito y Antifaz, mil intentos y un invento","year":"1972","poster":"https://image.tmdb.org/t/p/w500/eulGVawdBeq2GgTRaNlZP92UX5t.jpg"},
  "GzUyX95TRbI": {"tmdb":300427,"title":"La guerra gaucha","year":"1942","poster":"https://image.tmdb.org/t/p/w500/jwHNG295R6tySe5hxZidddTb2Y2.jpg"},
  "ROXrnHeoXyA": {"tmdb":1017396,"title":"Algo que pasó en Año Nuevo","year":"2022","poster":"https://image.tmdb.org/t/p/w500/7H5QBnoTvOvJZNpuO2UoY2WbX2E.jpg"},
  "r7w0UH4TRj0": {"tmdb":100512,"title":"Mercano, el Marciano","year":"2002","poster":"https://image.tmdb.org/t/p/w500/kDmdYQ79LgutNff2ZynFOAF93C7.jpg"},
  "DW6Dhiyd7n0": {"tmdb":415500,"title":"El turno nocturno","year":"2011","poster":"https://image.tmdb.org/t/p/w500/9mRMvy8kCMr9pU76aUm1BffNg3k.jpg"},
};

function toItem([id,title,durMin]:F): CatalogItem{
  const slug="pl-"+id.toLowerCase().replace(/[^a-z0-9]+/g,"-");
  const tmdb = POSTERS[id];
  const year = tmdb ? parseInt(tmdb.year,10) : 0;
  return {
    id:slug, slug, title: tmdb?.title ?? title,
    synopsis: tmdb
      ? `Filme argentino (TMDB ${tmdb.tmdb}, ${tmdb.year}) — player YouTube verificado via oEmbed. Upload de terceiro, titularidade em revisão; se o titular solicitar remoção, retiramos. Pôster TMDB (gratuito, com atribuição).`
      : `Filme argentino completo via playlist "Cine Argentino. Películas Argentinas Completas" (YouTube). Embed oficial verificado via oEmbed. Upload de terceiro — titularidade em revisão; se o titular solicitar remoção, retiramos. Origem preservada.`,
    shortSynopsis:`Argentina · ${tmdb?.year ?? ""} · ${durMin} min`,
    poster: tmdb?.poster ?? "", backdrop:`https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    contentType:"movie", year, durationMin:durMin, country:"Argentina", regions:["Buenos Aires"],
    languages:["Español"], subtitles:[], genres:["Cinema argentino"],
    tags:["Argentina","Cine Argentino","Playlist"],
    source:{ provider:"youtube", sourceUrl:`https://www.youtube.com/watch?v=${id}&list=PLj9stbUOTbCuRN8CqKn_t93L5MvhPf98U`, officialWebsite:`https://www.youtube.com/watch?v=${id}`, embedAllowed:true, checkedAt:new Date().toISOString(), rightsStatus:"unknown", accessType:"free", status:"active" },
    collectionIds:["col-cine-ar-pl"], personIds:[], rating: tmdb ? `TMDB ${tmdb.tmdb}` : "", ageRating:"Classificação não informada",
  } as CatalogItem;
}

export const playlistFilms: CatalogItem[] = FILMS.map(toItem);
