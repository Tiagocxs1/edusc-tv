"use client";
import { use } from "react";
import { collections, catalog } from "@/lib/catalog/mockCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";
import Link from "next/link";
export default function Page({ params }: { params: Promise<{ slug:string }> }){
  const { slug } = use(params);
  const col=collections.find(c=>c.slug===slug);
  if(!col) return <div className="py-6">Coleção não encontrada.</div>;
  const items=catalog.filter(c=> col.contentIds.includes(c.id));
  return (
    <div className="py-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-[#222] bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={col.cover} alt="" className="h-[240px] w-full object-cover opacity-60"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"/>
        <div className="absolute bottom-0 p-6">
          <p className="text-xs tracking-widest text-white/70">{col.type.toUpperCase()}</p>
          <h1 className="text-2xl font-black text-white">{col.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">{col.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(c=> <VerticalCard key={c.id} item={c} />)}</div>
      <Link href="/tv/cinema" className="text-sm text-[#8a8a8a] hover:text-white">← Cinema</Link>
    </div>
  );
}
