"use client";
// Navegação espacial 10-foot: foca pelo grid, não só DOM order. Restaura foco ao voltar.
let lastFocused: HTMLElement | null = null;

export function initSpatialNavigation(){
  if(typeof window==="undefined") return;
  document.addEventListener("focusin", (e)=>{
    const t=e.target as HTMLElement;
    if(t?.dataset?.focusable==="true" || t?.tabIndex>=0) lastFocused=t;
  });
  // CHANNEL UP/DOWN, VOLUME, BACK
  window.addEventListener("keydown", (e)=>{
    const tag=(e.target as HTMLElement)?.tagName;
    if(tag==="INPUT"||tag==="TEXTAREA") return;
    // K play/pause já tratado no player, aqui M mute F fullscreen
    if(e.key==="ChannelUp" || (e.key==="PageUp")){ window.dispatchEvent(new CustomEvent("edusc:channelUp")); e.preventDefault(); }
    if(e.key==="ChannelDown" || (e.key==="PageDown")){ window.dispatchEvent(new CustomEvent("edusc:channelDown")); e.preventDefault(); }
    if(e.key==="Backspace" || e.key==="BrowserBack"){ window.history.back(); e.preventDefault(); }
  });
}

export function restoreFocus(){
  if(lastFocused && document.contains(lastFocused)){
    lastFocused.focus();
  }
}

export function moveFocus(dir:"up"|"down"|"left"|"right"){
  const focusable=[...document.querySelectorAll<HTMLElement>('[data-focusable="true"], [tabindex="0"]')].filter(el=> el.offsetParent!==null);
  const cur=document.activeElement as HTMLElement;
  const idx=focusable.indexOf(cur);
  if(idx===-1){ focusable[0]?.focus(); return; }
  // simples: left/right = idx±1, up/down estima colunas via rect
  if(dir==="right") focusable[(idx+1)%focusable.length]?.focus();
  if(dir==="left") focusable[(idx-1+focusable.length)%focusable.length]?.focus();
  if(dir==="down" || dir==="up"){
    const cols=Math.max(2, Math.floor(window.innerWidth/320));
    const step= dir==="down" ? cols : -cols;
    let next=idx+step;
    if(next<0) next=0;
    if(next>=focusable.length) next=focusable.length-1;
    focusable[next]?.focus();
  }
}
