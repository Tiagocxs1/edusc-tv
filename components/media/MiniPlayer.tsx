"use client";
import { createContext, useContext, useState } from "react";
type Item = { id:string; title:string; thumb:string } | null;
const Ctx = createContext<{ item:Item; play:(i:NonNullable<Item>)=>void; close:()=>void } | null>(null);
export function MiniPlayerProvider({ children }: { children:React.ReactNode }){
  const [item,setItem]=useState<Item>(null);
  const [minimized,setMinimized]=useState(false);
  return <Ctx.Provider value={{ item, play:(i)=>{ setItem(i); setMinimized(false); }, close:()=> setItem(null)}}>
    {children}
    {item && (
      <>
        {/* desktop */}
        <div className="hidden md:block fixed bottom-4 right-4 z-50 w-[360px] overflow-hidden rounded-xl border border-[#222] bg-[#0f0f0f] shadow-2xl">
          <div className="relative aspect-video bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.thumb} alt={item.title} className="h-full w-full object-cover opacity-80"/>
            <div className="absolute inset-0 grid place-items-center"><span className="grid h-10 w-10 place-items-center rounded-full bg-white text-black">▶</span></div>
            <button onClick={()=> setItem(null)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white border border-white/20">×</button>
          </div>
          <div className="flex items-center justify-between p-3">
            <p className="text-sm font-semibold text-white line-clamp-1">{item.title}</p>
            <div className="flex gap-1">
              <button onClick={()=>setMinimized(v=>!v)} className="rounded-full border border-[#222] px-2 py-1 text-xs text-white hover:bg-white hover:text-black">⧉</button>
              <a href={`/tv/filmes/${item.id}`} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">Expandir</a>
            </div>
          </div>
        </div>
        {/* mobile */}
        <div className="md:hidden fixed bottom-[64px] inset-x-2 z-50 flex items-center gap-3 rounded-xl border border-[#222] bg-[#0f0f0f] p-2 shadow-2xl">
          <span className="grid h-8 w-8 place-items-center rounded bg-white text-black">▶</span>
          <p className="flex-1 text-sm font-semibold text-white line-clamp-1">{item.title}</p>
          <a href={`/tv/filmes/${item.id}`} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">Abrir</a>
          <button onClick={()=> setItem(null)} className="grid h-8 w-8 place-items-center rounded-full border border-[#222] text-white">×</button>
        </div>
      </>
    )}
  </Ctx.Provider>;
}
export function useMiniPlayer(){
  const v=useContext(Ctx);
  if(!v) throw new Error("useMiniPlayer outside provider");
  return v;
}
