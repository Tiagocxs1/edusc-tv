"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { mockContents, mockChannels, mockCountries, mockMovies } from "@/lib/mock-data";

export default function Page(){
  const [q,setQ]=useState("Chile");
  const res = useMemo(()=>{
    const lo=q.toLowerCase();
    return {
      canais: mockChannels.filter(c=>c.name.toLowerCase().includes(lo) || c.country.name.toLowerCase().includes(lo)),
      filmes: [...mockContents, ...mockMovies].filter(c=>c.title.toLowerCase().includes(lo) || c.category.toLowerCase().includes(lo)),
      paises: mockCountries.filter(c=>c.name.toLowerCase().includes(lo)),
    };
  },[q]);
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Busca</h1>
      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar: Chile, documentário, tango…" className="w-full rounded-full border border-[#222] bg-[#141414] px-4 py-3 text-sm text-white placeholder:text-[#6b6b6b] focus:outline-none focus:ring-2 focus:ring-[#e50914]"/>
        <span className="hidden sm:inline-flex items-center rounded-full border border-[#222] bg-[#0f0f0f] px-3 text-xs text-[#6b6b6b]">/ para focar</span>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <section className="space-y-3"><h3 className="text-xs tracking-widest font-bold text-[#8a8a8a]">CANAIS ({res.canais.length})</h3>{res.canais.map(c=> <Link key={c.id} href={`/tv/canais/${c.id}`} className="block rounded-xl border border-[#222] bg-[#141414] p-3 hover:bg-[#1a1a1a]"><p className="text-sm font-semibold text-white">{c.name}</p><p className="text-xs text-[#8a8a8a]">{c.country.flag} {c.country.name}</p></Link>) || <p className="text-sm text-[#6b6b6b]">Nenhum canal.</p>}</section>
        <section className="space-y-3"><h3 className="text-xs tracking-widest font-bold text-[#8a8a8a]">FILMES & DOCS ({res.filmes.length})</h3>{res.filmes.map(f=> <Link key={f.id} href={`/tv/filmes/${f.id}`} className="block rounded-xl border border-[#222] bg-[#141414] p-3 hover:bg-[#1a1a1a]"><p className="text-sm font-semibold text-white line-clamp-2">{f.title}</p><p className="text-xs text-[#8a8a8a]">{f.category}</p></Link>)}</section>
        <section className="space-y-3"><h3 className="text-xs tracking-widest font-bold text-[#8a8a8a]">PAÍSES ({res.paises.length})</h3><div className="flex flex-wrap gap-2">{res.paises.map(p=> <Link key={p.id} href={`/tv/paises#${p.id}`} className="rounded-full border border-[#222] bg-[#141414] px-3 py-1 text-sm hover:bg-[#1a1a1a]">{p.flag} {p.name}</Link>)}</div>
          {res.filmes.length===0 && res.canais.length===0 && res.paises.length===0 && <div className="rounded-xl border border-dashed border-[#333] p-6 text-center text-sm text-[#6b6b6b]">Nenhum conteúdo encontrado. Tente outro termo ou explore categorias.</div>}
        </section>
      </div>
    </div>
  );
}
