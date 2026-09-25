"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { mockContents, mockChannels, mockCountries } from "@/lib/mock-data";

export function SearchModal({ open, onClose }: { open:boolean; onClose:()=>void }){
  const [q,setQ]=useState("");
  const results = useMemo(()=>{
    if(!q) return { canais:[], filmes:[], paises:[] };
    const lo=q.toLowerCase();
    return {
      canais: mockChannels.filter(c=>c.name.toLowerCase().includes(lo)).slice(0,3),
      filmes: mockContents.filter(c=>c.title.toLowerCase().includes(lo)).slice(0,4),
      paises: mockCountries.filter(c=>c.name.toLowerCase().includes(lo)).slice(0,6),
    };
  },[q]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-[70] grid place-items-start pt-[72px] bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[#222] bg-[#0f0f0f] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[#222] p-3">
          <span className="text-[#6b6b6b]">⌕</span>
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar canais, filmes, documentários, países… (ex: Chile)" className="w-full bg-transparent text-sm text-white placeholder:text-[#6b6b6b] focus:outline-none"/>
          <button onClick={onClose} className="rounded-full border border-[#222] px-3 py-1 text-xs text-[#8a8a8a] hover:text-white">ESC</button>
        </div>
        <div className="max-h-[60vh] overflow-auto p-4 space-y-6">
          {!q && <p className="text-sm text-[#6b6b6b]">Tente “Chile”, “Cuba”, “documentário”, “cine”.</p>}
          {q && (
            <>
              <section><h3 className="text-xs tracking-widest text-[#8a8a8a] font-bold">CANAIS</h3><div className="mt-2 grid gap-2">{results.canais.length? results.canais.map(c=> <Link key={c.id} href={`/tv/canais/${c.id}`} onClick={onClose} className="rounded-lg border border-[#222] bg-[#141414] px-3 py-2 text-sm text-white hover:bg-[#1a1a1a]">{c.name} · {c.country.flag} {c.country.name}</Link>) : <p className="text-sm text-[#6b6b6b]">Nenhum canal.</p>}</div></section>
              <section><h3 className="text-xs tracking-widest text-[#8a8a8a] font-bold">FILMES & PROGRAMAS</h3><div className="mt-2 grid gap-2">{results.filmes.map(f=> <Link key={f.id} href={`/tv/filmes/${f.id}`} onClick={onClose} className="rounded-lg border border-[#222] bg-[#141414] px-3 py-2 text-sm text-white hover:bg-[#1a1a1a]">{f.title}</Link>)}</div></section>
              <section><h3 className="text-xs tracking-widest text-[#8a8a8a] font-bold">PAÍSES</h3><div className="mt-2 flex flex-wrap gap-2">{results.paises.map(p=> <Link key={p.id} href={`/tv/paises#${p.id}`} onClick={onClose} className="rounded-full border border-[#222] bg-[#141414] px-3 py-1 text-sm text-white hover:bg-[#1a1a1a]">{p.flag} {p.name}</Link>)}</div></section>
            </>
          )}
        </div>
        <div className="border-t border-[#222] p-3 text-center text-xs text-[#6b6b6b]">Pressione <span className="border border-[#333] rounded px-1">Enter</span> para abrir · <span className="border border-[#333] rounded px-1">ESC</span> para fechar</div>
      </div>
    </div>
  );
}
