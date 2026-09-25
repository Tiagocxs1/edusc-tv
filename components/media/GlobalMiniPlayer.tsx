"use client";
import Link from "next/link";
import { usePlayer } from "@/lib/player/PlayerContext";
export function GlobalMiniPlayer(){
  const p=usePlayer();
  const cur=p.current;
  if(!cur || !p.isMiniPlayer) return null;
  return (
    <>
      <div className="hidden md:block fixed bottom-4 right-4 z-50 w-[360px] overflow-hidden rounded-xl border border-[#222] bg-[#0f0f0f] shadow-2xl">
        <div className="relative aspect-video bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cur.thumbnail} alt={cur.title} className="h-full w-full object-cover opacity-80"/>
          <div className="absolute inset-0 grid place-items-center"><span className="grid h-10 w-10 place-items-center rounded-full bg-white text-black">▶</span></div>
          <button onClick={()=> p.close()} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white border border-white/20">×</button>
        </div>
        <div className="flex items-center justify-between p-3">
          <p className="text-sm font-semibold text-white line-clamp-1">{cur.title}</p>
          <div className="flex gap-1">
            <button onClick={()=> p.setMini(false)} className="rounded-full border border-[#222] px-2 py-1 text-xs text-white hover:bg-white hover:text-black">⧉ Expandir</button>
            <button onClick={()=> p.close()} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">Fechar</button>
          </div>
        </div>
      </div>
      <div className="md:hidden fixed bottom-[64px] inset-x-2 z-50 flex items-center gap-3 rounded-xl border border-[#222] bg-[#0f0f0f] p-2 shadow-2xl">
        <span className="grid h-8 w-8 place-items-center rounded bg-white text-black">▶</span>
        <p className="flex-1 text-sm font-semibold text-white line-clamp-1">{cur.title}</p>
        <Link href={`/tv/filmes/${cur.id}`} onClick={()=> p.setMini(false)} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">Abrir</Link>
        <button onClick={()=> p.close()} className="grid h-8 w-8 place-items-center rounded-full border border-[#222] text-white">×</button>
      </div>
    </>
  );
}
