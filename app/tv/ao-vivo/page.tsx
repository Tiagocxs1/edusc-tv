"use client";
import { useState, useMemo } from "react";
import { epgChannels, epgCountries } from "@/lib/epg/mockChannels";
import { LiveChannelCard } from "@/components/epg/LiveChannelCard";

const CATS=["Todos","Cultural","Educativo","Universitário","Público","Regional","Música","Documentários","Cinema"] as const;

export default function Page(){
  const [pais,setPais]=useState("Todos");
  const [regiao,setRegiao]=useState("Todas");
  const [cat,setCat]=useState("Todos");
  const [onlyLive,setOnlyLive]=useState(false);

  const regions = useMemo(()=> pais==="Todos" ? [] : [...new Set(epgChannels.filter(c=>c.country.name===pais).map(c=>c.region))],[pais]);

  const filtered = epgChannels.filter(c=>{
    if(pais!=="Todos" && c.country.name!==pais) return false;
    if(regiao!=="Todas" && c.region!==regiao) return false;
    if(cat!=="Todos" && c.category!==cat) return false;
    if(onlyLive && c.status!=="LIVE") return false;
    return true;
  });

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-black">Ao Vivo</h1>
        <span className="rounded bg-[#e50914] px-2 py-1 text-xs font-bold text-white">● {filtered.filter(c=>c.status==="LIVE").length} AO VIVO</span>
        <label className="ml-auto flex items-center gap-2 text-xs text-[#8a8a8a]"><input type="checkbox" checked={onlyLive} onChange={e=>setOnlyLive(e.target.checked)}/> Só ao vivo</label>
      </div>

      <div className="flex flex-wrap gap-2">
        {["Todos",...epgCountries.map(c=>c.name)].slice(0,9).map(p=> <button key={p} onClick={()=>{setPais(p); setRegiao("Todas");}} className={`rounded-full px-3 py-1.5 text-xs font-bold border ${pais===p ? "bg-white text-black border-white":"bg-[#141414] text-[#8a8a8a] border-[#222]"}`}>{p}</button>)}
      </div>
      {regions.length>0 && (
        <div className="flex flex-wrap gap-2">
          {["Todas",...regions].map(r=> <button key={r} onClick={()=>setRegiao(r)} className={`rounded-full px-3 py-1.5 text-xs font-bold border ${regiao===r ? "bg-[#e50914] text-white border-[#e50914]":"bg-[#141414] text-[#8a8a8a] border-[#222]"}`}>{r}</button>)}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {CATS.map(c=> <button key={c} onClick={()=>setCat(c)} className={`rounded-full px-3 py-1.5 text-xs font-bold border ${cat===c ? "bg-white text-black border-white":"bg-[#141414] text-[#8a8a8a] border-[#222]"}`}>{c}</button>)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c=> <LiveChannelCard key={c.id} channel={c} />)}
      </div>
      {filtered.length===0 && <div className="rounded-xl border border-dashed border-[#333] p-8 text-center text-sm text-[#6b6b6b]">Nenhum canal com filtros: {pais} {regiao!=="Todas" && `· ${regiao}`} · {cat} {onlyLive && "· ao vivo"}</div>}
      <p className="text-xs text-[#5a5a5a]">Filtros combináveis: País + Região + Categoria + Ao vivo. Timezone de cada canal usado no cálculo de "agora".</p>
    </div>
  );
}
