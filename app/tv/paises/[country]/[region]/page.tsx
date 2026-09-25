"use client";
import { use } from "react";
import { epgChannels, epgCountries } from "@/lib/epg/mockChannels";
import { LiveChannelCard } from "@/components/epg/LiveChannelCard";
import Link from "next/link";
export default function Page({ params }: { params: Promise<{ country:string; region:string }> }){
  const { country, region } = use(params);
  const dec = decodeURIComponent(region);
  const c = epgCountries.find(x=> x.slug===country);
  const chans = epgChannels.filter(x=> x.country.slug===country && x.region.toLowerCase()===dec.toLowerCase());
  return (
    <div className="py-6 space-y-6">
      <Link href={`/tv/paises/${country}`} className="text-sm text-[#8a8a8a] hover:text-white">← {c?.name}</Link>
      <h1 className="text-2xl font-black">{c?.flag} {c?.name} · {dec}</h1>
      <p className="text-sm text-[#8a8a8a]">Conteúdos e canais da região — caráter regional EDUSC.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{chans.map(ch=> <LiveChannelCard key={ch.id} channel={ch} />)}</div>
      {chans.length===0 && <p className="text-sm text-[#6b6b6b]">Nenhum canal nesta região no mock.</p>}
    </div>
  );
}
