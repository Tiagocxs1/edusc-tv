"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchModal } from "@/components/search/SearchModal";
import { useTVMode } from "@/lib/tv-mode";

const NAV = [
  { id: "inicio", label: "Início", href: "/tv" },
  { id: "ao-vivo", label: "Ao Vivo", href: "/tv/ao-vivo" },
  { id: "filmes", label: "Filmes", href: "/tv/filmes" },
  { id: "series", label: "Séries", href: "/tv/series" },
  { id: "docs", label: "Docs", href: "/tv/documentarios" },
  { id: "cultura", label: "Cultura", href: "/tv/cultura" },
  { id: "paises", label: "Países", href: "/tv/paises" },
];

const OUTROS_INTERNOS = [
  { label:"Fontes verificadas", href:"/tv/fontes" },
  { label:"Coleções", href:"/tv/cinema" },
  { label:"Realizadores", href:"/tv/realizadores/eduardo-bueno" },
  { label:"Festivais", href:"/tv/festivais/mar-del-plata" },
  { label:"Minha lista", href:"/tv/minha-lista" },
  { label:"Histórico", href:"/tv/historico" },
];
const OUTROS_EXTERNOS = [
  { label:"Argflix — Cine Argentino ↗", href:"https://www.argflix.com/" },
  { label:"Libreflix — Cinema livre ↗", href:"https://libreflix.org/" },
  { label:"Itaú Cultural Play (login) ↗", href:"https://www.itauculturalplay.com.br/browser" },
  { label:"Spcine Play (conta) ↗", href:"https://www.spcineplay.com.br/" },
  { label:"Ubuplay ↗", href:"https://www.ubuplay.com/app" },
  { label:"Tela Brasil ↗", href:"https://telabrasil.cultura.gov.br/" },
  { label:"Uruguay Audiovisual ↗", href:"https://uruguayaudiovisual.com/en/proyectos/" },
];

export function TVHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { tv, toggle } = useTVMode();
  useEffect(()=>{
    const onScroll=()=> setScrolled(window.scrollY>16);
    const onKey=(e:KeyboardEvent)=>{ if(e.key==="/" && !search){ e.preventDefault(); setSearch(true);} if(e.key==="Escape") setSearch(false); };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", onKey);
    return ()=>{ window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  },[search]);
  return (
    <>
      <header className={`sticky top-0 z-40 border-b bg-[#0a0a0a]/90 backdrop-blur transition-all ${scrolled ? "border-[#2a2a2a] shadow-lg h-[52px] md:h-[56px]" : "border-[#1f1f1f] h-[56px] md:h-[64px]"}`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button aria-label="Abrir menu" onClick={() => setOpen(v=>!v)} className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded border border-[#2a2a2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]"><span className="text-lg">{open ? "×" : "≡"}</span></button>
            <Link href="/tv" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] rounded">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-[#e50914] text-[11px] font-black">EDUSC</span>
              <span className="text-[18px] md:text-[20px] font-black tracking-[0.12em]">EDUSC TV</span>
              <span className="hidden sm:inline text-[10px] tracking-widest text-[#b3b3b3] border border-[#2a2a2a] rounded px-1.5 py-0.5">BETA</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
            {NAV.map(item => {
              const active = pathname === item.href;
              return <Link key={item.id} href={item.href} data-focusable="true" className={`px-3 py-2 rounded text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] ${active ? "bg-white text-black" : "text-[#b3b3b3] hover:text-white hover:bg-[#1f1f1f]"}`}>{item.label}</Link>;
            })}
            <div className="relative group">
              <button data-focusable="true" aria-haspopup="true" className="px-3 py-2 rounded text-sm font-medium text-[#b3b3b3] hover:text-white hover:bg-[#1f1f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">Outros ▾</button>
              <div className="absolute right-0 top-full hidden group-hover:block group-focus-within:block w-[280px] rounded-xl border border-[#222] bg-[#0f0f0f] p-2 shadow-2xl z-50">
                {OUTROS_INTERNOS.map(o=> <Link key={o.label} href={o.href} className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-[#1f1f1f]">{o.label}</Link>)}
                <p className="px-3 pt-2 text-[11px] tracking-widest text-[#6b6b6b] font-bold">EXTERNOS — SÓ LINK</p>
                {OUTROS_EXTERNOS.map(o=> <a key={o.label} href={o.href} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2 text-sm text-[#8a8a8a] hover:text-white hover:bg-[#1f1f1f]">{o.label}</a>)}
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={()=>setSearch(true)} className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#141414] px-3 py-1.5 text-sm text-[#b3b3b3] hover:text-white hover:border-[#3a3a3a]">⌕ Buscar <span className="hidden lg:inline text-xs border border-[#333] rounded px-1">/</span></button>
            <button onClick={()=>setSearch(true)} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1f1f1f] border border-[#2a2a2a] text-sm" aria-label="Buscar">⌕</button>
            <button onClick={toggle} aria-pressed={tv} className={`hidden sm:inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold tracking-widest ${tv ? "bg-[#e50914] border-[#e50914] text-white" : "border-[#2a2a2a] bg-[#141414] text-[#b3b3b3] hover:text-white"}`}>{tv ? "TV ●" : "MODO TV"}</button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-[#1f1f1f] bg-[#0a0a0a] px-4 py-3">
            <nav className="grid gap-1">
              {NAV.map(item => <Link key={item.id} href={item.href} onClick={()=>setOpen(false)} className={`px-3 py-2.5 rounded text-sm font-medium ${pathname===item.href ? "bg-white text-black":"bg-[#141414] text-white"}`}>{item.label}</Link>)}
              <p className="px-1 pt-2 text-[11px] tracking-widest text-[#6b6b6b] font-bold">OUTROS</p>
              {OUTROS_INTERNOS.map(o=> <Link key={o.label} href={o.href} onClick={()=>setOpen(false)} className="px-3 py-2.5 rounded text-sm bg-[#141414] text-white">{o.label}</Link>)}
              <p className="px-1 pt-2 text-[11px] tracking-widest text-[#6b6b6b] font-bold">EXTERNOS</p>
              {OUTROS_EXTERNOS.map(o=> <a key={o.label} href={o.href} target="_blank" rel="noreferrer" className="px-3 py-2.5 rounded text-sm bg-[#0f0f0f] text-[#8a8a8a]">{o.label}</a>)}
            </nav>
          </div>
        )}
      </header>
      <SearchModal open={search} onClose={()=>setSearch(false)} />
    </>
  );
}
