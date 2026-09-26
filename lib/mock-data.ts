import type { Country, Channel, Content, Movie, Category } from "@/types";

export const mockCountries: Country[] = [
  { id: "br", name: "Brasil", code: "BR", flag: "🇧🇷", region: "Brasil" },
  { id: "ar", name: "Argentina", code: "AR", flag: "🇦🇷", region: "Cone Sul" },
  { id: "uy", name: "Uruguai", code: "UY", flag: "🇺🇾", region: "Cone Sul" },
  { id: "py", name: "Paraguai", code: "PY", flag: "🇵🇾", region: "Cone Sul" },
  { id: "cl", name: "Chile", code: "CL", flag: "🇨🇱", region: "Cone Sul" },
  { id: "bo", name: "Bolívia", code: "BO", flag: "🇧🇴", region: "Andes" },
  { id: "pe", name: "Peru", code: "PE", flag: "🇵🇪", region: "Andes" },
  { id: "ec", name: "Equador", code: "EC", flag: "🇪🇨", region: "Andes" },
  { id: "co", name: "Colômbia", code: "CO", flag: "🇨🇴", region: "Andes" },
  { id: "ve", name: "Venezuela", code: "VE", flag: "🇻🇪", region: "Andes" },
  { id: "mx", name: "México", code: "MX", flag: "🇲🇽", region: "América do Norte" },
  { id: "pa", name: "Panamá", code: "PA", flag: "🇵🇦", region: "América Central" },
  { id: "cr", name: "Costa Rica", code: "CR", flag: "🇨🇷", region: "América Central" },
  { id: "sv", name: "El Salvador", code: "SV", flag: "🇸🇻", region: "América Central" },
  { id: "gt", name: "Guatemala", code: "GT", flag: "🇬🇹", region: "América Central" },
  { id: "hn", name: "Honduras", code: "HN", flag: "🇭🇳", region: "América Central" },
  { id: "ni", name: "Nicarágua", code: "NI", flag: "🇳🇮", region: "América Central" },
  { id: "do", name: "Rep. Dominicana", code: "DO", flag: "🇩🇴", region: "Caribe" },
  { id: "cu", name: "Cuba", code: "CU", flag: "🇨🇺", region: "Caribe" },
  { id: "ht", name: "Haiti", code: "HT", flag: "🇭🇹", region: "Caribe" },
];

export const mockChannels: Channel[] = [
  { id: "dw-espanol", name: "DW Español", logo: "", category: "Notícias", country: mockCountries[10], isLive: true },
  { id: "france24-es", name: "FRANCE 24 Español", logo: "", category: "Notícias", country: mockCountries[8], isLive: true },
  { id: "c5n", name: "C5N Argentina", logo: "", category: "Notícias", country: mockCountries[1], isLive: true },
  { id: "nmas", name: "N+ Univision 24/7", logo: "", category: "Notícias", country: mockCountries[10], isLive: true },
  { id: "encuentro", name: "Canal Encuentro", logo: "", category: "Cultura", country: mockCountries[1], isLive: true },
];

export const mockContents: Content[] = [
  { id: "buenas-8anos", title: "OITO ANOS DE BUENAS IDEIAS - EDUARDO BUENO", description: "Buenas Ideias 8 anos — embed oficial verificado.", thumbnail: "https://i.ytimg.com/vi/DvqHEB0Y6mI/hqdefault.jpg", category: "Documentário", duration: "15:03", source: "youtube", url: "https://www.youtube.com/watch?v=DvqHEB0Y6mI", provider: "YouTube", countryId: "br" },
  { id: "auto-gris-1919", title: "El automóvil gris (1919) HD — Clássico mexicano domínio público", description: "Enrique Rosas, 1919 — nº 98 melhores filmes mexicanos. HD via Topaz Cine de Oro.", thumbnail: "https://i.ytimg.com/vi/FmfouqMv_EA/hqdefault.jpg", category: "Cinema", duration: "120:00", source: "youtube", url: "https://www.youtube.com/watch?v=FmfouqMv_EA", provider: "YouTube", countryId: "mx" },
  { id: "dw-bigbang", title: "Pirámides, materia oscura y Big Bang | DW Documental", description: "DW Documental oficial — 42 min.", thumbnail: "https://i.ytimg.com/vi/0t8r5r2KcWA/hqdefault.jpg", category: "Documentário", duration: "42:25", source: "youtube", url: "https://www.youtube.com/watch?v=0t8r5r2KcWA", provider: "YouTube", countryId: "mx" },
  { id: "rio-1940s", title: "RIO 1940s — Copacabana/Pão de Açúcar/Carnaval (Archive MP4 direto)", description: "Periscope/Archive.org — MP4 480p direto, fora do YouTube.", thumbnail: "https://archive.org/download/TSw7Dh424g3a65n28DixCkOk5H84GE/__ia_thumb.jpg", category: "Arquivo", duration: "09:22", source: "html5", url: "https://archive.org/details/TSw7Dh424g3a65n28DixCkOk5H84GE", provider: "Archive.org", countryId: "br" },
  { id: "encuentro-cap1", title: "Nos vemos en Encuentro: Capítulo 1", description: "Canal Encuentro oficial.", thumbnail: "https://i.ytimg.com/vi/N9zOAZ-JA5I/hqdefault.jpg", category: "Cultura", duration: "30:00", source: "youtube", url: "https://www.youtube.com/watch?v=N9zOAZ-JA5I", provider: "YouTube", countryId: "ar" },
  { id: "sintel-2010", title: "Sintel - Open Movie by Blender Foundation (CC BY)", description: "Blender oficial — 15 min, 1080p.", thumbnail: "https://i.ytimg.com/vi/eRsGyueVLvQ/hqdefault.jpg", category: "Cinema", duration: "14:48", source: "youtube", url: "https://www.youtube.com/watch?v=eRsGyueVLvQ", provider: "YouTube", countryId: "br" },
];

// Cinema latino real — só com pôster oficial. Sem thumbnail YouTube como cartaz.
export const mockMovies: Movie[] = [
  { id: "auto-gris-1919", title: "El automóvil gris (1919)", description: "Enrique Rosas — mudo mexicano, domínio público. IMDb tt0009894. Pôster original Wikimedia.", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/24/El_Automovil_Gris_-_poster.jpg", category: "Longas", source: "youtube", url: "https://www.youtube.com/watch?v=FmfouqMv_EA", provider: "YouTube", year: "1919", director: "Enrique Rosas", countryId: "mx" },
];

export const mockCategories: Category[] = [
  { id: "doc", name: "Documentários", slug: "documentarios", icon: "🎞️" },
  { id: "cine", name: "Cinema", slug: "cinema", icon: "🎬" },
  { id: "cultura", name: "Cultura", slug: "cultura", icon: "🎭" },
  { id: "educ", name: "Educação", slug: "educacao", icon: "🎓" },
  { id: "musica", name: "Música", slug: "musica", icon: "♪" },
  { id: "infantil", name: "Infantil", slug: "infantil", icon: "✦" },
];
