"use client";
import { use } from "react";
import Link from "next/link";
import { catalog } from "@/lib/catalog/mockCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";
export default function Page({ params }: { params: Promise<{ country:string; region:string }> }){
  const { country, region } = use(params);
  const dec=decodeURIComponent(region);
  const items=catalog.filter(c=> c.country.toLowerCase()===country.toLowerCase() && c.regions.some(r=>r.toLowerCase()===dec.toLowerCase()));
  return (
    <div className="py-6 space-y-6">
      <Link href={`/tv/cinema/${country}`} className="text-sm text-[#8a8a8a] hover:text-white">← Cinema {country}</Link>
      <h1 className="text-2xl font-black capitalize">{country} · {dec}</h1>
      <p className="text-sm text-[#8a8a8a]">Conteúdos da região — Patagônia, Andes, Nordeste, Sul, etc.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(c=> <VerticalCard key={c.id} item={c} />)}</div>
      {items.length===0 && <p className="text-sm text-[#6b6b6b]">Nenhum título nesta região no mock.</p>}
    </div>
  );
}
