"use client";
import { use } from "react";
import Link from "next/link";
import { catalog, collections } from "@/lib/catalog/mockCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";

export default function Page({ params }: { params: Promise<{ country:string }> }){
  const { country } = use(params);
  const label=country.charAt(0).toUpperCase()+country.slice(1);
  const items=catalog.filter(c=> c.country.toLowerCase()===country.toLowerCase() || c.regions.some(r=>r.toLowerCase()===country.toLowerCase()));
  const regs=[...new Set(items.flatMap(i=>i.regions))];
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Cinema {label}</h1>
      <div className="flex flex-wrap gap-2">{regs.map(r=> <Link key={r} href={`/tv/cinema/${country}/${encodeURIComponent(r.toLowerCase())}`} className="rounded-full border border-[#222] bg-[#141414] px-3 py-1 text-xs hover:bg-white hover:text-black">{r}</Link>)}</div>
      <section className="space-y-3"><h2 className="font-bold text-white">Em destaque</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.slice(0,4).map(c=> <VerticalCard key={c.id} item={c} />)}</div>{items.length===0 && <p className="text-sm text-[#6b6b6b]">Sem títulos mockados — arquitetura permite adicionar.</p>}</section>
      <section className="space-y-3"><h2 className="font-bold text-white">Coleções</h2><div className="grid md:grid-cols-3 gap-4">{collections.filter(col=> (col.country??"").toLowerCase()===country.toLowerCase() || col.region?.toLowerCase()===country.toLowerCase()).map(col=> <Link key={col.id} href={`/tv/colecoes/${col.slug}`} className="rounded-xl border border-[#222] bg-[#141414] p-4 hover:border-[#333]"><p className="font-bold text-white">{col.title}</p><p className="text-xs text-[#8a8a8a]">{col.description}</p></Link>)}</div></section>
      <Link href="/tv/cinema" className="text-sm text-[#8a8a8a] hover:text-white">← Voltar ao cinema</Link>
    </div>
  );
}
