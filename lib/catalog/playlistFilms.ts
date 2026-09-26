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

function toItem([id,title,durMin]:F): CatalogItem{
  const slug="pl-"+id.toLowerCase().replace(/[^a-z0-9]+/g,"-");
  return {
    id:slug, slug, title,
    synopsis:`Filme argentino completo via playlist "Cine Argentino. Películas Argentinas Completas" (YouTube). Embed oficial verificado via oEmbed. Upload de terceiro — titularidade em revisão; se o titular solicitar remoção, retiramos. Origem preservada.`,
    shortSynopsis:`Argentina · ${durMin} min · playlist`,
    poster:`https://i.ytimg.com/vi/${id}/hqdefault.jpg`, backdrop:`https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    contentType:"movie", year:0, durationMin:durMin, country:"Argentina", regions:["Buenos Aires"],
    languages:["Español"], subtitles:[], genres:["Cinema argentino"],
    tags:["Argentina","Cine Argentino","Playlist"],
    source:{ provider:"youtube", sourceUrl:`https://www.youtube.com/watch?v=${id}&list=PLj9stbUOTbCuRN8CqKn_t93L5MvhPf98U`, officialWebsite:`https://www.youtube.com/watch?v=${id}`, embedAllowed:true, checkedAt:new Date().toISOString(), rightsStatus:"unknown", accessType:"free", status:"active" },
    collectionIds:["col-cine-ar-pl"], personIds:[], rating:"", ageRating:"Classificação não informada",
  } as CatalogItem;
}

export const playlistFilms: CatalogItem[] = FILMS.map(toItem);
