"use client";
import { use } from "react";
import { companies, catalog } from "@/lib/catalog/mockCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";
export default function Page({ params }: { params: Promise<{ slug:string }> }){
  const { slug } = use(params);
  const c=companies.find(x=>x.slug===slug);
  if(!c) return <div className="py-6">Produtora não encontrada.</div>;
  const items=catalog.filter(x=> x.production===c.name || x.personIds.some(()=>false));
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">{c.name}</h1>
      <p className="text-sm text-[#8a8a8a]">{c.country} · {c.region} · {c.city} {c.website && <a href={c.website} target="_blank" className="text-white hover:underline">· site oficial ↗</a>}</p>
      <p className="text-sm text-[#d0d0d0]">{c.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(x=> <VerticalCard key={x.id} item={x} />)}</div>
      {items.length===0 && <p className="text-sm text-[#6b6b6b]">Filmes desta produtora aparecerão aqui (mock demo).</p>}
    </div>
  );
}
