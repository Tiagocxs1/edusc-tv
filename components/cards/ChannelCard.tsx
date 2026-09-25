import type { Channel } from "@/types";
export function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <div tabIndex={0} data-focusable="true" className={`group relative overflow-hidden rounded-xl border bg-[#141414] p-4 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] ${channel.isLive ? "border-[#e50914]/40" : "border-[#222]"}`}>
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#1f1f1f] text-sm font-black">{channel.name.slice(0,2).toUpperCase()}</div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">{channel.name}</p>
        <p className="text-xs text-[#8a8a8a]">{channel.category} · {channel.country.flag} {channel.country.code}</p>
      </div>
      {channel.isLive && <span className="ml-auto inline-flex items-center gap-1 rounded bg-[#e50914] px-2 py-1 text-[10px] font-bold tracking-widest text-white">● AO VIVO</span>}
    </div>
  );
}
