"use client";
import Link from "next/link";
import type { EpgChannel } from "@/lib/epg/types";
import { getCurrentItem, getNextItem, getProgram, progressOf, formatInTimezone } from "@/lib/epg/helpers";
import { LiveBadge } from "@/components/media/LiveBadge";

export function LiveChannelCard({ channel }: { channel:EpgChannel }){
  const now=new Date();
  const curItem=getCurrentItem(channel.schedule, now);
  const nextItem=getNextItem(channel.schedule, now);
  const curProg=curItem ? getProgram(curItem.programId) : null;
  const nextProg=nextItem ? getProgram(nextItem.programId) : null;
  const prog=progressOf(curItem, now);
  const statusLabel = channel.status==="LIVE" ? "🔴 AO VIVO" : channel.status==="OFFLINE" ? "FORA DO AR" : channel.status==="SCHEDULED" ? "PRÓXIMO" : "STATUS INDISPONÍVEL";

  return (
    <Link href={`/tv/canais/${channel.slug}`} tabIndex={0} data-focusable="true" className="group flex flex-col overflow-hidden rounded-xl border border-[#222] bg-[#141414] hover:border-[#333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">
      <div className="flex items-center gap-3 p-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#1f1f1f] text-xs font-black">#{String(channel.channelNumber).padStart(2,"0")}</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{channel.name}</p>
          <p className="truncate text-xs text-[#8a8a8a]">{channel.city} · {channel.country.flag} {channel.country.name} · {channel.category}</p>
        </div>
        <span className={`ml-auto text-[10px] font-bold tracking-widest px-2 py-1 rounded ${channel.status==="LIVE" ? "bg-[#e50914] text-white" : "bg-[#222] text-[#8a8a8a]"}`}>{statusLabel}</span>
      </div>
      {channel.schedule.length===0 ? (
        <div className="px-3 pb-3 text-xs text-[#6b6b6b]">🔴 AO VIVO — Programação não disponível. Confira o site oficial.</div>
      ) : curProg ? (
        <div className="px-3 pb-3 space-y-2">
          <div>
            <p className="text-xs tracking-widest text-[#e50914] font-bold">AGORA</p>
            <p className="text-sm font-semibold text-white line-clamp-1">{curProg.title}</p>
            <p className="text-xs text-[#8a8a8a]">{curItem && formatInTimezone(curItem.start, channel.timezone)} — {curItem && formatInTimezone(curItem.end, channel.timezone)} · {curProg.category}</p>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#222]"><div className="h-full bg-[#e50914]" style={{ width:`${prog.pct}%` }}/></div>
          </div>
          {nextProg && nextItem && (
            <div className="rounded-lg bg-[#0f0f0f] border border-[#1f1f1f] p-2">
              <p className="text-[11px] tracking-widest text-[#6b6b6b]">A SEGUIR · {formatInTimezone(nextItem.start, channel.timezone)}</p>
              <p className="text-xs font-medium text-white line-clamp-1">{nextProg.title}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="px-3 pb-3 text-xs text-[#8a8a8a]">Próximo: {nextProg?.title ?? "—"} {nextItem && `· ${formatInTimezone(nextItem.start, channel.timezone)}`}</div>
      )}
    </Link>
  );
}
