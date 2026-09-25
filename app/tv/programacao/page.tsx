"use client";
import { useState } from "react";
import { epgChannels } from "@/lib/epg/mockChannels";
import { EPGDesktop, EPGMobile } from "@/components/epg/EPG";
import { GuiaModal } from "@/components/media/GuiaModal";

const DAYS=["Hoje","Amanhã","Quinta","Sexta","Sábado","Domingo"];

export default function Page(){
  const [day,setDay]=useState("Hoje");
  const [guia,setGuia]=useState(false);
  const nowLabel=new Date().toLocaleTimeString("pt-BR",{hour:"2-digit", minute:"2-digit"});
  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Programação</h1>
        <button onClick={()=>setGuia(true)} className="rounded-full border border-[#222] bg-[#141414] px-4 py-2 text-sm hover:bg-white hover:text-black">Guia</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {DAYS.map(d=> <button key={d} onClick={()=>setDay(d)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold border ${day===d ? "bg-white text-black border-white" : "bg-[#141414] text-[#8a8a8a] border-[#222] hover:text-white"}`}>{d}</button>)}
      </div>
      <div className="flex items-center gap-2 text-xs text-[#8a8a8a]">
        <span>Timeline · {day}</span>
        <span className="ml-auto flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#e50914] animate-pulse"/> AGORA {nowLabel}</span>
        <span className="hidden sm:inline">— horário do canal (ex: Córdoba America/Argentina/Buenos_Aires)</span>
      </div>

      <div className="hidden lg:block"><EPGDesktop channels={epgChannels}/></div>
      <div className="lg:hidden"><EPGMobile channels={epgChannels}/></div>

      <p className="text-xs text-[#5a5a5a]">EPG desktop horizontal com scroll + TV Mode (fontes maiores, menos canais, navegação ↑↓ canais / ←→ programas / Enter assistir). Mobile usa timeline vertical.</p>
      <GuiaModal open={guia} onClose={()=>setGuia(false)} />
    </div>
  );
}
