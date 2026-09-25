"use client";
// DASH stub modular — sem DRM bypass, retorna RESTRICTED se precisar auth/DRM
import type { PlayerAdapter } from "../engine";
export function createDashAdapter(): PlayerAdapter{
  let state: any = "IDLE";
  const listeners=new Map<string, Set<Function>>();
  const emit=(e:string,d?:any)=> listeners.get(e)?.forEach(cb=>cb(d));
  return {
    async load(source){
      state="LOADING";
      // detecta DRM: se url contém drm ou precisa licença, vai para RESTRICTED
      if(source.url.includes("drm") || source.url.includes("widevine")){
        state="RESTRICTED";
        emit("onError", { code:"RESTRICTED", message:"Conteúdo com DRM não disponível para reprodução integrada." });
        return;
      }
      state="READY"; emit("onReady");
    },
    async play(){ if(state==="RESTRICTED") return; state="PLAYING"; emit("onPlay"); },
    async pause(){ state="PAUSED"; emit("onPause"); },
    async stop(){ state="IDLE"; },
    async seek(s){ emit("onTimeUpdate", s); },
    async setVolume(v){ emit("onVolumeChange", v); },
    async mute(){ emit("onVolumeChange", 0); },
    async unmute(){ emit("onVolumeChange", 1); },
    async setFullscreen(){ emit("onFullscreenChange", true); },
    async exitFullscreen(){ emit("onFullscreenChange", false); },
    async enterPiP(){},
    async exitPiP(){},
    getCurrentTime(){ return 0; },
    getDuration(){ return 0; },
    getState(){ return state; },
    destroy(){ state="IDLE"; listeners.clear(); },
    on(event, cb){ if(!listeners.has(event)) listeners.set(event, new Set()); listeners.get(event)!.add(cb); return ()=> listeners.get(event)!.delete(cb); }
  };
}
