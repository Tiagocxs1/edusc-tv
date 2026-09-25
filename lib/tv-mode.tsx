"use client";
import { createContext, useContext, useEffect, useState } from "react";
const Ctx = createContext<{ tv:boolean; toggle:()=>void } | null>(null);
export function TVModeProvider({ children }: { children: React.ReactNode }){
  const [tv,setTv]=useState(false);
  useEffect(()=>{ const s=localStorage.getItem("edusc:tv"); if(s==="1") setTv(true); },[]);
  useEffect(()=>{ document.documentElement.dataset.tv = tv ? "1":"0"; localStorage.setItem("edusc:tv", tv?"1":"0"); },[tv]);
  return <Ctx.Provider value={{ tv, toggle:()=>setTv(v=>!v) }}>{children}</Ctx.Provider>;
}
export function useTVMode(){
  const v=useContext(Ctx);
  if(!v) throw new Error("useTVMode outside provider");
  return v;
}
