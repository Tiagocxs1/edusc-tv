"use client";
import { useEffect } from "react";
import { initSpatialNavigation, moveFocus, restoreFocus } from "@/lib/tv/spatialNavigation";
export function TVFocusManager() {
  useEffect(() => {
    initSpatialNavigation();
    const onKey = (e: KeyboardEvent) => {
      const tag=(e.target as HTMLElement)?.tagName;
      if(tag==="INPUT"||tag==="TEXTAREA") return;
      if(e.key==="ArrowUp") { e.preventDefault(); moveFocus("up"); }
      if(e.key==="ArrowDown") { e.preventDefault(); moveFocus("down"); }
      if(e.key==="ArrowLeft") { e.preventDefault(); moveFocus("left"); }
      if(e.key==="ArrowRight") { e.preventDefault(); moveFocus("right"); }
      if(e.key==="Escape"){ restoreFocus(); }
      if(e.key.toLowerCase()==="k"){ e.preventDefault(); window.dispatchEvent(new CustomEvent("edusc:togglePlay")); }
      if(e.key.toLowerCase()==="m"){ window.dispatchEvent(new CustomEvent("edusc:toggleMute")); }
      if(e.key.toLowerCase()==="f"){ const el=document.documentElement; if(document.fullscreenElement) document.exitFullscreen().catch(()=>{}); else el.requestFullscreen().catch(()=>{}); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
