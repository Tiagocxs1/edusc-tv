export type PlayerStateKind = "IDLE"|"LOADING"|"READY"|"PLAYING"|"PAUSED"|"BUFFERING"|"ENDED"|"ERROR"|"RESTRICTED"|"EXTERNAL"|"UNSUPPORTED";
export type PlayerEvent = "onReady"|"onPlay"|"onPause"|"onBuffer"|"onProgress"|"onEnded"|"onError"|"onVolumeChange"|"onFullscreenChange"|"onTimeUpdate"|"onQualityChange"|"onCaptionChange";

export interface PlayerAdapter {
  load(source: { url:string; type:string }): Promise<void>;
  play(): Promise<void>;
  pause(): Promise<void>;
  stop(): Promise<void>;
  seek(seconds:number): Promise<void>;
  setVolume(value:number): Promise<void>;
  mute(): Promise<void>;
  unmute(): Promise<void>;
  setFullscreen(): Promise<void>;
  exitFullscreen(): Promise<void>;
  enterPiP(): Promise<void>;
  exitPiP(): Promise<void>;
  getCurrentTime(): number;
  getDuration(): number;
  getState(): PlayerStateKind;
  destroy(): void;
  on(event: PlayerEvent, cb: (data?:any)=>void): ()=>void;
}

// Máquina de estados
export function nextState(current: PlayerStateKind, event:string): PlayerStateKind{
  const map: Record<string, Record<string, PlayerStateKind>> = {
    IDLE: { load: "LOADING", external: "EXTERNAL", restricted: "RESTRICTED", unsupported: "UNSUPPORTED" },
    LOADING: { ready: "READY", error: "ERROR", restricted: "RESTRICTED" },
    READY: { play: "PLAYING", error: "ERROR" },
    PLAYING: { pause: "PAUSED", buffer: "BUFFERING", ended: "ENDED", error: "ERROR" },
    PAUSED: { play: "PLAYING", error: "ERROR" },
    BUFFERING: { play: "PLAYING", error: "ERROR" },
    ENDED: { play: "PLAYING", load: "LOADING" },
    ERROR: { retry: "LOADING", load: "LOADING" },
    EXTERNAL: { open: "EXTERNAL" },
    RESTRICTED: {},
    UNSUPPORTED: {},
  };
  return map[current]?.[event] ?? current;
}
