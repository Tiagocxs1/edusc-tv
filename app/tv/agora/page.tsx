import { epgChannels } from "@/lib/epg/mockChannels";
import { LiveChannelCard } from "@/components/epg/LiveChannelCard";

export default function Page(){
  const live = epgChannels.filter(c=>c.status==="LIVE");
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">O que está passando agora</h1>
      <p className="text-sm text-[#8a8a8a]">Ordenação editorial por relevância — ao vivo primeiro. Timezone de cada canal respeitado.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {live.map(c=> <LiveChannelCard key={c.id} channel={c} />)}
      </div>
      {live.length===0 && <div className="rounded-xl border border-dashed border-[#333] p-8 text-center text-sm text-[#6b6b6b]">Nenhum ao vivo no momento.</div>}
    </div>
  );
}
