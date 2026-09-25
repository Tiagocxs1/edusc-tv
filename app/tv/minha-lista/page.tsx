"use client";
import { useEffect, useState } from "react";
import { catalog } from "@/lib/catalog/mockCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";
export default function Page(){
  const [ids,setIds]=useState<string[]>([]);
  useEffect(()=>{ try{ setIds(JSON.parse(localStorage.getItem("edusc:fav:catalog")||"[]")); }catch{} },[]);
  const items=catalog.filter(c=> ids.includes(c.slug));
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Minha lista</h1>
      {items.length===0 ? <p className="text-sm text-[#6b6b6b]">Nenhum favorito ainda. Abra um filme e clique em ♡ Minha lista.</p> : <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(c=> <VerticalCard key={c.id} item={c} />)}</div>}
    </div>
  );
}
