// Extraído legalmente do HTML público de https://www.argflix.com/ em 2026-09-25.
// Títulos + sinopses oficiais do Argflix. Player via JS/Wix (sem IDs estáticos) → link-only para /ver/<slug>.
// Embed: playlist coletiva Cine Argentino via videoseries (ver coleção col-cine-ar-pl).
export interface ArgflixTitle { slug:string; title:string; synopsis:string; kind:string; }
export const argflixTitles: ArgflixTitle[] = [
  { slug:"historias-extraordinarias", title:"Historias extraordinarias (2008)", synopsis:"Mariano Llinás. 245 min em 3 atos / 18 capítulos. Três histórias paralelas de X, H e Z.", kind:"Película" },
  { slug:"algo-que-paso-en-ano-nuevo", title:"Algo que pasó en año nuevo (2022)", synopsis:"Ópera prima de Jorge Pinarello (Te lo resumo así nomás). Comédia negra/terror/suspense. Casal em Ano Novo em La Plata.", kind:"Película" },
  { slug:"mercano-el-marciano", title:"Mercano, el marciano — La serie completa", synopsis:"Microcortos animados 1998-2000 (MuchMusic Argentina). Humor ácido underground. Gênese do filme.", kind:"Serie" },
  { slug:"adios-querida-luna", title:"Adiós, querida Luna (2005)", synopsis:"Fernando Spiner. Sci-fi + comédia negra. Terra em crise climática em 2068.", kind:"Película" },
  { slug:"teatro-abierto", title:"Teatro Abierto: Escenario de Resistencia (série)", synopsis:"4 capítulos, 40 anos do Teatro Abierto (1981). Rede clandestina contra censura e listas negras.", kind:"Serie documental" },
  { slug:"la-campana", title:"La Campana (2010)", synopsis:"Drama romântico + realismo mágico. Mar del Plata 1982, Guerra das Malvinas.", kind:"Película" },
  { slug:"jorge", title:"Jorge (série)", synopsis:"Jorge Peker, advogado frustrado em call center. Herança e depressão em Buenos Aires.", kind:"Serie" },
  { slug:"cualca", title:"Cualca! (2012)", synopsis:"Malena Pichot. Sketches de Duro de domar (Canal 9). Sátira social, fenômeno digital.", kind:"Serie" },
  { slug:"la-terraza", title:"La terraza (1963)", synopsis:"Leopoldo Torre Nilsson. Alienação juvenil da alta burguesia portenha. Clássico autoral.", kind:"Película" },
  { slug:"ilusion-en-movimiento", title:"Ilusión en movimiento", synopsis:"Rosário 1986, volta da democracia. Gerardo reencontra o filho David, 7 anos.", kind:"Película" },
  { slug:"el-dia-que-me-quieras", title:"El día que me quieras (1969)", synopsis:"Remake colorido do clássico Gardel 1935. Cantor de tangos vs família rica.", kind:"Película" },
  { slug:"el-secreto-de-sus-ojos", title:"El secreto de sus ojos (2009)", synopsis:"Campanella. Agente judicial aposentado, crime dos anos 70, amor e ditadura. Oscar.", kind:"Película" },
  { slug:"por-ahora", title:"Por ahora (2013)", synopsis:"Malena Pichot. Cinco amigos trintões em Buenos Aires, crise da idade.", kind:"Minissérie" },
  { slug:"el-mismo-amor-la-misma-lluvia", title:"El mismo amor, la misma lluvia (1999)", synopsis:"Campanella/Darín. Escritor e Laura ao longo de 20 anos.", kind:"Película" },
  { slug:"pasaje-de-vida", title:"Pasaje de vida (2015)", synopsis:"Diego Corsini. Coprodução AR-ES. Militância e desarraigo nos anos 70.", kind:"Película" },
  { slug:"tangos-el-exilio-de-gardel", title:"Tangos. El exilio de Gardel", synopsis:"Exilados argentinos em Paris. Tango, tragédia e comédia — 'tanguedia'.", kind:"Película" },
  { slug:"vigia-planetario", title:"Vigía Planetario (série completa)", synopsis:"Animação Puño Robot / Revista Fierro. Super-herói autóctono entre mate e cosmos.", kind:"Serie" },
  { slug:"boy-scaut", title:"Boy Scaut (12 episódios)", synopsis:"Irmãos punk cuidando da irmã pequena. Comédia e custódia.", kind:"Serie" },
  { slug:"espiral", title:"Espiral", synopsis:"Cia. De Artes VillaVill. Direção ChangoVilla.", kind:"Corto" },
];
export const argflixUrl = (slug:string)=> `https://www.argflix.com/ver/${slug}`;
