export type ProviderKind = "youtube" | "vimeo" | "hls" | "html5" | "iframe" | "unknown";

export interface ContentSource {
  id: string;
  title: string;
  provider: ProviderKind;
  sourceUrl: string;        // URL original
  embedUrl?: string;        // URL de embed quando aplicável
  videoId?: string;
  streamUrl?: string;       // .m3u8 / .mp4
  thumbnail: string;
  poster?: string;
  duration?: string;
  isLive?: boolean;
  allowPiP?: boolean;
  allowFullscreen?: boolean;
  aspectRatio?: "16:9" | "9:16" | "4:3" | "1:1";
  // futuro: sources[] com priority
  sources?: { provider: ProviderKind; url:string; priority:number }[];
}

export type PlayerEvent = "PLAYER_READY"|"PLAY"|"PAUSE"|"TIME_UPDATE"|"ENDED"|"ERROR"|"ENTER_FULLSCREEN"|"EXIT_FULLSCREEN"|"ENTER_PIP"|"EXIT_PIP";

export interface PlayerState {
  current: ContentSource | null;
  playing: boolean;
  muted: boolean;
  volume: number; // 0-1
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  isPiP: boolean;
  isMiniPlayer: boolean;
  isLoading: boolean;
  error: string | null;
  quality?: string;
  qualities?: string[];
}
