"use client";
import { createContext, useContext, useState, useCallback } from "react";
import type { ContentSource } from "./types";
import type { PlayerStateKind } from "./engine";

type CtxType = {
  current: ContentSource | null;
  currentChannel?: any; currentProgram?: any; nextProgram?: any;
  playing: boolean; muted: boolean; volume: number;
  currentTime: number; duration: number;
  isFullscreen: boolean; isPiP: boolean; isMiniPlayer: boolean; isLoading: boolean; error: string | null;
  playerState: PlayerStateKind;
  play: (src:ContentSource)=>void;
  pause: ()=>void; setPlaying:(b:boolean)=>void;
  setMuted:(b:boolean)=>void; setVolume:(v:number)=>void;
  setTime:(t:number,d:number)=>void; setError:(e:string|null)=>void; setLoading:(b:boolean)=>void;
  setFullscreen:(b:boolean)=>void; setPiP:(b:boolean)=>void; setMini:(b:boolean)=>void;
  close:()=>void; seek:(s:number)=>void;
  setChannel:(c:any)=>void; setProgram:(p:any, next?:any)=>void;
  setPlayerState:(s:PlayerStateKind)=>void;
};

const Ctx = createContext<CtxType|null>(null);

export function PlayerProvider({ children }: { children:React.ReactNode }){
  const [current,setCurrent]=useState<ContentSource|null>(null);
  const [currentChannel,setChannel]=useState<any>(null);
  const [currentProgram,setProg]=useState<any>(null);
  const [nextProgram,setNext]=useState<any>(null);
  const [playing,setPlaying]=useState(false);
  const [muted,setMuted]=useState(false);
  const [volume,setVolume]=useState(1);
  const [currentTime,setCurrentTime]=useState(0);
  const [duration,setDuration]=useState(0);
  const [isFullscreen,setFullscreen]=useState(false);
  const [isPiP,setPiP]=useState(false);
  const [isMiniPlayer,setMini]=useState(false);
  const [isLoading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);
  const [playerState,setPlayerState]=useState<PlayerStateKind>("IDLE");

  const play = useCallback((src:ContentSource)=>{
    setCurrent(src); setError(null); setLoading(true); setPlaying(true); setMini(false); setCurrentTime(0); setPlayerState("LOADING");
    // respeita direitos: se restricted -> EXTERNAL
    if((src as any).rightsStatus==="restricted"){ setPlayerState("RESTRICTED"); }
  },[]);
  const close = useCallback(()=>{
    setCurrent(null); setPlaying(false); setMini(false); setFullscreen(false); setPiP(false); setError(null); setLoading(false); setPlayerState("IDLE");
  },[]);
  const setTime = useCallback((t:number,d:number)=>{ setCurrentTime(t); if(d) setDuration(d); },[]);
  const setProgramWrap=(p:any,next?:any)=>{ setProg(p); setNext(next); };

  return <Ctx.Provider value={{
    current, currentChannel, currentProgram, nextProgram,
    playing, muted, volume, currentTime, duration, isFullscreen, isPiP, isMiniPlayer, isLoading, error, playerState,
    play, pause:()=>{ setPlaying(false); setPlayerState("PAUSED"); }, setPlaying:(b)=>{ setPlaying(b); setPlayerState(b?"PLAYING":"PAUSED"); },
    setMuted, setVolume, setTime, setError, setLoading, setFullscreen, setPiP, setMini, close, seek:(s:number)=>setCurrentTime(s),
    setChannel, setProgram:setProgramWrap, setPlayerState
  }}>{children}</Ctx.Provider>;
}

export function usePlayer(){
  const v=useContext(Ctx);
  if(!v) throw new Error("usePlayer outside provider");
  return v;
}
