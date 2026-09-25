"use client";
import { useState } from "react";
import { catalog } from "@/lib/catalog/mockCatalog";
import { fullExternalCatalog } from "@/lib/catalog/fullCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";
import { FilterChip } from "@/components/catalog/Filters";

export default function Page(){
  const [tag,setTag]=useState("Todos");
  const playable=catalog.filter(c=> c.contentType==="series" && c.source.embedAllowed);
  const external=fullExternalCatalog.filter(c=> c.contentType==="series");
  const all=[...playable, ...external];
  const tags=["Todos","Com player","Argflix","Argentina","Brasil"];
  const filtered=all.filter(c=>{
    if(tag==="Todos") return true;
    if(tag==="Com player") return c.source.embedAllowed;
    if(tag==="Argflix") return c.tags.includes("Argflix");
    return c.country===tag;
  });
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Séries ({all.length})</h1>
      <p className="text-sm text-[#8a8a8a]">Séries e minisséries latinas. Com player abre aqui; sem player abre na fonte.</p>
      <div className="flex flex-wrap gap-2">{tags.map(t=> <FilterChip key={t} active={tag===t} onClick={()=>setTag(t)}>{t}</FilterChip>)}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{filtered.map(c=> <VerticalCard key={c.id} item={c} />)}</div>
    </div>
  );
}
