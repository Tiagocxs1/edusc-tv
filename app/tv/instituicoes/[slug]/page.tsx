"use client";
import { use } from "react";
import { institutions, catalog } from "@/lib/catalog/mockCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";
export default function Page({ params }: { params: Promise<{ slug:string }> }){
  const { slug } = use(params);
  const inst=institutions.find(x=>x.slug===slug);
  if(!inst) return <div className="py-6">Instituição não encontrada.</div>;
  const items=catalog.filter(c=> c.institutionId===inst.id);
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">{inst.name}</h1>
      <p className="text-sm text-[#8a8a8a]">{inst.country} · {inst.city} · <a href={inst.website} target="_blank" className="text-white hover:underline">{inst.website}</a></p>
      <p className="text-sm text-[#d0d0d0]">{inst.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(c=> <VerticalCard key={c.id} item={c} />)}</div>
      {items.length===0 && <p className="text-sm text-[#6b6b6b]">Vídeos desta instituição em breve.</p>}
    </div>
  );
}
