"use client";
import { useEffect, useState } from "react";
import { catalog } from "@/lib/catalog/mockCatalog";
import Link from "next/link";
export default function Page(){
  const [hist,setHist]=useState<any[]>([]);
  useEffect(()=>{ try{ setHist(JSON.parse(localStorage.getItem("edusc:history")||"[]")); }catch{} },[]);
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Histórico</h1>
      {hist.length===0 ? <p className="text-sm text-[#6b6b6b]">Histórico local — progress &gt;5% e &lt;95% aparece em Continue assistindo.</p> : (
        <div className="grid gap-2">
          {hist.map((h,i)=> {
            const item=catalog.find(c=>c.slug===h.contentId);
            return <Link key={i} href={`/tv/filmes/${h.contentId}`} className="flex items-center gap-3 rounded-xl border border-[#222] bg-[#141414] p-3 hover:border-[#333]">
              <span className="text-xs text-[#6b6b6b]">{new Date(h.watchedAt).toLocaleString("pt-BR")}</span>
              <span className="text-sm font-semibold text-white">{item?.title ?? h.contentId}</span>
              <span className="ml-auto text-xs text-[#8a8a8a]">{item?.country ?? ""}</span>
            </Link>;
          })}
        </div>
      )}
    </div>
  );
}
