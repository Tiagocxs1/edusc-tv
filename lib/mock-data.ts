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
  { id: "tv-brasil", name: "TV Brasil", logo: "", category: "Público", country: mockCountries[0], isLive: true },
  { id: "canal-futura", name: "Canal Futura", logo: "", category: "Educação", country: mockCountries[0], isLive: true },
  { id: "encuentro", name: "Canal Encuentro", logo: "", category: "Cultura", country: mockCountries[1], isLive: true },
  { id: "tv-unam", name: "TV UNAM", logo: "", category: "Universidade", country: mockCountries[10], isLive: true },
  { id: "senial-colombia", name: "Señal Colombia", logo: "", category: "Público", country: mockCountries[8], isLive: true },
  { id: "cubavision", name: "Cubavisión", logo: "", category: "Público", country: mockCountries[18], isLive: true },
];

export const mockContents: Content[] = [
  { id: "1", title: "OITO ANOS DE BUENAS IDEIAS - EDUARDO BUENO", description: "Buenas Ideias 8 anos — história do Brasil com Eduardo Bueno (embed real verificado).", thumbnail: "https://img.youtube.com/vi/DvqHEB0Y6mI/hqdefault.jpg", category: "Documentário", duration: "15:03", source: "youtube", url: "https://www.youtube.com/watch?v=DvqHEB0Y6mI", provider: "YouTube", countryId: "br" },
  { id: "2", title: "QUEM INVENTOU O BRASIL? - EDUARDO BUENO", description: "Buenas Ideias — Quem inventou o Brasil? (embed real).", thumbnail: "https://img.youtube.com/vi/Mvjz-TZ_lDc/hqdefault.jpg", category: "Curtas", duration: "68:35", source: "youtube", url: "https://www.youtube.com/watch?v=Mvjz-TZ_lDc", provider: "YouTube", countryId: "br" },
  { id: "3", title: "Big Buck Bunny 60fps 4K - Blender Foundation", description: "Curta open source Blender — embed real.", thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg", category: "Cinema", duration: "10:34", source: "youtube", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ", provider: "YouTube", countryId: "bo" },
  { id: "4", title: "PSY - GANGNAM STYLE (4K)", description: "Videoclipe real — teste de embed YouTube.", thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg", category: "Música", duration: "04:13", source: "youtube", url: "https://www.youtube.com/watch?v=9bZkp7q19f0", provider: "YouTube", countryId: "br" },
  { id: "5", title: "Me at the zoo - Primeiro vídeo do YouTube", description: "Histórico — embed real verificado.", thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg", category: "História", duration: "00:19", source: "youtube", url: "https://www.youtube.com/watch?v=jNQXAC9IVRw", provider: "YouTube", countryId: "br" },
  { id: "6", title: "OITO ANOS DE BUENAS IDEIAS - Reprise", description: "Reprise embed real.", thumbnail: "https://img.youtube.com/vi/DvqHEB0Y6mI/hqdefault.jpg", category: "Cinema", duration: "15:03", source: "youtube", url: "https://www.youtube.com/watch?v=DvqHEB0Y6mI", provider: "YouTube", countryId: "cu" },
];

export const mockMovies: Movie[] = [
  { id: "m1", title: "OITO ANOS DE BUENAS IDEIAS (2018)", description: "Buenas Ideias — embed real.", thumbnail: "https://img.youtube.com/vi/DvqHEB0Y6mI/hqdefault.jpg", category: "Longas", source: "youtube", url: "https://www.youtube.com/watch?v=DvqHEB0Y6mI", provider: "YouTube", year: "2024", director: "Eduardo Bueno", countryId: "br" },
  { id: "m2", title: "QUEM INVENTOU O BRASIL? (2017)", description: "Buenas Ideias — embed real.", thumbnail: "https://img.youtube.com/vi/Mvjz-TZ_lDc/hqdefault.jpg", category: "Longas", source: "youtube", url: "https://www.youtube.com/watch?v=Mvjz-TZ_lDc", provider: "YouTube", year: "2024", director: "Eduardo Bueno", countryId: "br" },
  { id: "m3", title: "Big Buck Bunny (2008)", description: "Blender Foundation — embed real.", thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg", category: "Longas", source: "youtube", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ", provider: "YouTube", year: "2008", director: "Blender", countryId: "cl" },
];

export const mockCategories: Category[] = [
  { id: "doc", name: "Documentários", slug: "documentarios", icon: "🎞️" },
  { id: "cine", name: "Cinema", slug: "cinema", icon: "🎬" },
  { id: "cultura", name: "Cultura", slug: "cultura", icon: "🎭" },
  { id: "educ", name: "Educação", slug: "educacao", icon: "🎓" },
  { id: "musica", name: "Música", slug: "musica", icon: "♪" },
  { id: "infantil", name: "Infantil", slug: "infantil", icon: "✦" },
];
