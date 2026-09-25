export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: "Brasil" | "Cone Sul" | "Andes" | "América Central" | "Caribe" | "América do Norte";
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: string;
  country: Country;
  isLive: boolean;
}

export type SourceType = "youtube" | "vimeo" | "hls" | "html5" | "external";

export interface Content {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  duration?: string;
  source: SourceType;
  url: string;
  provider: string;
  countryId?: string;
}

export interface Movie extends Content {
  year?: string;
  director?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}
