"use client";
import { use } from "react";
import { festivals, catalog } from "@/lib/catalog/mockCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";
export default function Page({ params }: { params: Promise<{ slug:string }> }){
  const { slug } = use(params);
  const f=festivals.find(x=>x.slug===slug);
  if(!f) return <div className="py-6">Festival não encontrado.</div>;
  const items=catalog.filter(c=> c.festivalId===f.id);
  return (
    <div className="py-6 space-y-6">
      <div className="overflow-hidden rounded-2xl border border-[#222] bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={f.cover} alt="" className="h-[200px] w-full object-cover opacity-70"/>
        <div className="p-6">
          <h1 className="text-2xl font-black">{f.name} · {f.year}</h1>
          <p className="text-sm text-[#8a8a8a]">{f.country} · {f.city} {f.website && <a href={f.website} target="_blank" className="text-white hover:underline">· site ↗</a>}</p>
          <p className="mt-2 text-sm text-[#d0d0d0]">{f.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(c=> <VerticalCard key={c.id} item={c} />)}</div>
    </div>
  );
}
