"use client";
import { useState } from "react";
import { catalog } from "@/lib/catalog/mockCatalog";
import { fullExternalCatalog } from "@/lib/catalog/fullCatalog";
import { playlistFilms } from "@/lib/catalog/playlistFilms";
import { VerticalCard } from "@/components/catalog/CatalogCard";
import { FilterChip } from "@/components/catalog/Filters";

export default function Page(){
  const [tag,setTag]=useState("Todos");
  const playable = catalog.filter(c=> c.contentType==="movie" && c.source.embedAllowed);
  const external = fullExternalCatalog.filter(c=> c.contentType==="movie");
  const all=[...playable, ...playlistFilms, ...external];
  const tags=["Todos","Com player","Cine Argentino","Argflix","Libreflix","Argentina","Brasil","México"];
  const filtered=all.filter(c=>{
    if(tag==="Todos") return true;
    if(tag==="Com player") return c.source.embedAllowed;
    if(tag==="Cine Argentino") return c.tags.includes("Cine Argentino") || c.tags.includes("Playlist");
    if(tag==="Argflix") return c.tags.includes("Argflix");
    if(tag==="Libreflix") return c.tags.includes("Libreflix");
    return c.country===tag;
  });
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Filmes ({all.length})</h1>
      <p className="text-sm text-[#8a8a8a]">Longas latinos. Com player abre aqui; sem player abre na fonte oficial (↗ FONTE). Tag filtra por origem.</p>
      <div className="flex flex-wrap gap-2">{tags.map(t=> <FilterChip key={t} active={tag===t} onClick={()=>setTag(t)}>{t}</FilterChip>)}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{filtered.map(c=> <VerticalCard key={c.id} item={c} />)}</div>
      {filtered.length===0 && <p className="text-sm text-[#6b6b6b]">Nenhum filme com este filtro.</p>}
    </div>
  );
}
