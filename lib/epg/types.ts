export type ChannelStatus = "LIVE"|"OFFLINE"|"SCHEDULED"|"UNKNOWN";
export type ChannelCategory = "Cultural"|"Educativo"|"Universitário"|"Público"|"Regional"|"Música"|"Documentários"|"Cinema"|"Infantil"|"Notícias"|"Ciência"|"História";

export interface EpgCountry {
  id:string; name:string; slug:string; code:string; flag:string; cover?:string; description?:string;
}
export interface EpgProgram {
  id:string; title:string; slug:string; description:string; thumbnail:string; category:string; durationMin:number; language?:string;
}
export interface ScheduleItem {
  id:string; channelId:string; programId:string;
  start: string; // ISO in channel timezone converted to UTC
  end: string;
  timezone: string;
  isLive?: boolean;
  status?: ChannelStatus;
}
export interface ChannelSource {
  type: "youtube"|"vimeo"|"hls"|"html5"|"iframe";
  provider: string;
  url: string;
  embedUrl?: string;
  isLive: boolean;
  quality?: string;
}
export interface EpgChannel {
  id:string; slug:string; name:string; shortName:string; description:string;
  country: EpgCountry; region:string; city:string; language:string;
  logo:string; cover:string; category: ChannelCategory; website?:string;
  source: ChannelSource;
  timezone: string;
  channelNumber: number;
  is24h: boolean;
  status: ChannelStatus;
  isActive: boolean;
  schedule: ScheduleItem[];
}
