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
  { id: "cubavision", name: "Cubavisión", logo: "", category: "Público", country: mockCountries[18], isLive: false },
];

export const mockContents: Content[] = [
  { id: "1", title: "Cinema Novo — Glauber Rocha e a invenção do Brasil moderno", description: "Documentário sobre o movimento que colocou o Brasil no mapa do cinema mundial.", thumbnail: "https://picsum.photos/seed/edusc1/640/360", category: "Documentário", duration: "52:14", source: "youtube", url: "https://www.youtube.com/watch?v=jNQXAC9IVRw", provider: "YouTube", countryId: "br" },
  { id: "2", title: "Cortometraje: La casa de los vientos", description: "Curta argentino premiado em festivais independentes.", thumbnail: "https://picsum.photos/seed/edusc2/640/360", category: "Curtas", duration: "14:02", source: "vimeo", url: "https://vimeo.com/123", provider: "Vimeo", countryId: "ar" },
  { id: "3", title: "Música Andina — Charango ao vivo em La Paz", description: "Sessão intimista com mestres do charango boliviano.", thumbnail: "https://picsum.photos/seed/edusc3/640/360", category: "Música", duration: "28:40", source: "youtube", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ", provider: "YouTube", countryId: "bo" },
  { id: "4", title: "Universidade e Território — Extensão na Amazônia", description: "Série sobre projetos de extensão universitária.", thumbnail: "https://picsum.photos/seed/edusc4/640/360", category: "Educação", duration: "22:11", source: "hls", url: "", provider: "HLS", countryId: "br" },
  { id: "5", title: "Infantil: Aventuras do Sabiá", description: "Animação brasileira com foco em fauna e cultura local.", thumbnail: "https://picsum.photos/seed/edusc5/640/360", category: "Infantil", duration: "11:33", source: "youtube", url: "https://www.youtube.com/watch?v=9bZkp7q19f0", provider: "YouTube", countryId: "br" },
  { id: "6", title: "Cine Cubano — Memorias del subdesarrollo (debate)", description: "Debate na Cinemateca de Cuba sobre o clássico de Gutiérrez Alea.", thumbnail: "https://picsum.photos/seed/edusc6/640/360", category: "Cinema", duration: "41:05", source: "external", url: "https://example.com", provider: "Cinemateca", countryId: "cu" },
];

export const mockMovies: Movie[] = [
  { id: "m1", title: "O Grande Circo Místico (2018)", description: "Drama familiar de Cacá Diegues com elenco latino.", thumbnail: "https://picsum.photos/seed/movie1/400/600", category: "Longas", source: "external", url: "", provider: "Vitrine", year: "2018", director: "Cacá Diegues", countryId: "br" },
  { id: "m2", title: "La Cordillera (2017)", description: "Thriller político argentino.", thumbnail: "https://picsum.photos/seed/movie2/400/600", category: "Longas", source: "youtube", url: "", provider: "YouTube", year: "2017", director: "Santiago Mitre", countryId: "ar" },
  { id: "m3", title: "Violeta foi para o céu (2011)", description: "Biografia da cantora Violeta Parra.", thumbnail: "https://picsum.photos/seed/movie3/400/600", category: "Longas", source: "vimeo", url: "", provider: "Vimeo", year: "2011", director: "Andrés Wood", countryId: "cl" },
];

export const mockCategories: Category[] = [
  { id: "doc", name: "Documentários", slug: "documentarios", icon: "🎞️" },
  { id: "cine", name: "Cinema", slug: "cinema", icon: "🎬" },
  { id: "cultura", name: "Cultura", slug: "cultura", icon: "🎭" },
  { id: "educ", name: "Educação", slug: "educacao", icon: "🎓" },
  { id: "musica", name: "Música", slug: "musica", icon: "♪" },
  { id: "infantil", name: "Infantil", slug: "infantil", icon: "✦" },
];
