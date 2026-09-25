"use client";
import { use } from "react";
import { persons, catalog } from "@/lib/catalog/mockCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";
export default function Page({ params }: { params: Promise<{ slug:string }> }){
  const { slug } = use(params);
  const p=persons.find(x=>x.slug===slug);
  if(!p) return <div className="py-6">Realizador não encontrado.</div>;
  const items=catalog.filter(c=> c.personIds.includes(p.id) || c.director===p.name);
  return (
    <div className="py-6 space-y-6">
      <div className="flex gap-4 items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.photo} alt={p.name} className="h-20 w-20 rounded-full object-cover border border-[#222]"/>
        <div>
          <h1 className="text-2xl font-black">{p.name}</h1>
          <p className="text-sm text-[#8a8a8a]">{p.country} · {p.region} · {p.role}</p>
          <p className="mt-2 max-w-2xl text-sm text-[#d0d0d0]">{p.biography}</p>
        </div>
      </div>
      <h2 className="font-bold">Filmografia</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(c=> <VerticalCard key={c.id} item={c} />)}</div>
      {items.length===0 && <p className="text-sm text-[#6b6b6b]">Sem títulos associados no mock.</p>}
    </div>
  );
}
