"use client";
import { use } from "react";
import Link from "next/link";
import { epgChannels, epgCountries } from "@/lib/epg/mockChannels";
import { LiveChannelCard } from "@/components/epg/LiveChannelCard";

export default function Page({ params }: { params: Promise<{ country:string }> }){
  const { country } = use(params);
  const c = epgCountries.find(x=> x.slug===country);
  const chans = epgChannels.filter(x=> x.country.slug===country);
  if(!c) return <div className="py-6">País não encontrado.</div>;
  const regions=[...new Set(chans.map(x=>x.region))];
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">{c.flag} {c.name}</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#222] bg-[#141414] p-4">
          <p className="font-semibold text-white">Canais ao vivo</p>
          <p className="text-sm text-[#8a8a8a]">{chans.length} canais · {regions.join(", ")}</p>
        </div>
        <div className="rounded-xl border border-[#222] bg-[#0f0f0f] p-4">
          <p className="text-sm font-bold">Regiões</p>
          <div className="mt-2 flex flex-wrap gap-2">{regions.map(r=> <Link key={r} href={`/tv/paises/${c.slug}/${encodeURIComponent(r.toLowerCase())}`} className="rounded-full border border-[#222] bg-[#141414] px-3 py-1 text-xs hover:bg-white hover:text-black">{r}</Link>)}</div>
        </div>
      </div>
      <h2 className="font-bold">Canais</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{chans.map(ch=> <LiveChannelCard key={ch.id} channel={ch} />)}</div>
      {chans.length===0 && <p className="text-sm text-[#6b6b6b]">Sem canais mockados para este país — arquitetura permite adicionar.</p>}
    </div>
  );
}
