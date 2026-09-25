"use client";
import { use } from "react";
import { epgChannels } from "@/lib/epg/mockChannels";
import { LiveChannelCard } from "@/components/epg/LiveChannelCard";
export default function Page({ params }: { params: Promise<{ slug:string }> }){
  const { slug } = use(params);
  const label=slug.charAt(0).toUpperCase()+slug.slice(1);
  const chans=epgChannels.filter(c=> c.category.toLowerCase()===slug.toLowerCase() || c.category.toLowerCase().includes(slug.toLowerCase()));
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">{label}</h1>
      <p className="text-sm text-[#8a8a8a]">Canais da categoria {label} — arquitetura expansível.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{chans.map(c=> <LiveChannelCard key={c.id} channel={c} />)}</div>
      {chans.length===0 && <div className="rounded-xl border border-dashed border-[#333] p-8 text-center text-sm text-[#6b6b6b]">Nenhum canal nesta categoria.</div>}
    </div>
  );
}
