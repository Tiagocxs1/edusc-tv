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
  { id: "buenas-quem-inventou", title: "QUEM INVENTOU O BRASIL? - EDUARDO BUENO", description: "Buenas Ideias — embed oficial.", thumbnail: "https://i.ytimg.com/vi/Mvjz-TZ_lDc/hqdefault.jpg", category: "Documentário", duration: "68:35", source: "youtube", url: "https://www.youtube.com/watch?v=Mvjz-TZ_lDc", provider: "YouTube", countryId: "br" },
  { id: "dw-bigbang", title: "Pirámides, materia oscura y Big Bang | DW Documental", description: "DW Documental oficial — 42 min.", thumbnail: "https://i.ytimg.com/vi/0t8r5r2KcWA/hqdefault.jpg", category: "Documentário", duration: "42:25", source: "youtube", url: "https://www.youtube.com/watch?v=0t8r5r2KcWA", provider: "YouTube", countryId: "mx" },
  { id: "encuentro-cap1", title: "Nos vemos en Encuentro: Capítulo 1", description: "Canal Encuentro oficial.", thumbnail: "https://i.ytimg.com/vi/N9zOAZ-JA5I/hqdefault.jpg", category: "Cultura", duration: "30:00", source: "youtube", url: "https://www.youtube.com/watch?v=N9zOAZ-JA5I", provider: "YouTube", countryId: "ar" },
  { id: "html-primeiro", title: "Seu primeiro código HTML - Curso em Vídeo", description: "Gustavo Guanabara — aula real.", thumbnail: "https://i.ytimg.com/vi/E6CdIawPTh0/hqdefault.jpg", category: "Educação", duration: "17:33", source: "youtube", url: "https://www.youtube.com/watch?v=E6CdIawPTh0", provider: "YouTube", countryId: "br" },
  { id: "manual-maquina", title: "TESTAMOS a MÁQUINA de 2000 ANOS!", description: "Manual do Mundo oficial.", thumbnail: "https://i.ytimg.com/vi/LPtIkMh7P3k/hqdefault.jpg", category: "Educação", duration: "12:00", source: "youtube", url: "https://www.youtube.com/watch?v=LPtIkMh7P3k", provider: "YouTube", countryId: "br" },
];

export const mockMovies: Movie[] = [
  { id: "buenas-8anos", title: "OITO ANOS DE BUENAS IDEIAS (2024)", description: "Buenas Ideias — embed oficial.", thumbnail: "https://i.ytimg.com/vi/DvqHEB0Y6mI/hqdefault.jpg", category: "Longas", source: "youtube", url: "https://www.youtube.com/watch?v=DvqHEB0Y6mI", provider: "YouTube", year: "2024", director: "Eduardo Bueno", countryId: "br" },
  { id: "dw-bigbang", title: "Big Bang DW (2024)", description: "DW Documental oficial.", thumbnail: "https://i.ytimg.com/vi/0t8r5r2KcWA/hqdefault.jpg", category: "Longas", source: "youtube", url: "https://www.youtube.com/watch?v=0t8r5r2KcWA", provider: "YouTube", year: "2024", director: "DW", countryId: "mx" },
  { id: "blender-bunny", title: "Big Buck Bunny 4K (2008)", description: "Blender Foundation open-source.", thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg", category: "Curtas", source: "youtube", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ", provider: "YouTube", year: "2008", director: "Blender", countryId: "br" },
];

export const mockCategories: Category[] = [
  { id: "doc", name: "Documentários", slug: "documentarios", icon: "🎞️" },
  { id: "cine", name: "Cinema", slug: "cinema", icon: "🎬" },
  { id: "cultura", name: "Cultura", slug: "cultura", icon: "🎭" },
  { id: "educ", name: "Educação", slug: "educacao", icon: "🎓" },
  { id: "musica", name: "Música", slug: "musica", icon: "♪" },
  { id: "infantil", name: "Infantil", slug: "infantil", icon: "✦" },
];
