"use client";
import { useState } from "react";
import type { EpgChannel } from "@/lib/epg/types";
import { getCurrentItem, getNextItem, getProgram, formatInTimezone } from "@/lib/epg/helpers";
import Link from "next/link";

export function EPGDesktop({ channels }: { channels:EpgChannel[] }){
  const hours=[16,17,18,19,20];
  return (
    <div className="overflow-auto rounded-xl border border-[#222] bg-[#0f0f0f]">
      <div className="min-w-[800px]">
        <div className="grid" style={{ gridTemplateColumns:`180px repeat(${hours.length}, 1fr)`}}>
          <div className="p-3 text-xs font-bold tracking-widest text-[#6b6b6b]">CANAL</div>
          {hours.map(h=> <div key={h} className="p-3 text-xs text-[#8a8a8a] border-l border-[#1f1f1f]">{String(h).padStart(2,"0")}:00</div>)}
        </div>
        {channels.map(ch=> (
          <div key={ch.id} className="grid border-t border-[#1f1f1f]" style={{ gridTemplateColumns:`180px 1fr`}}>
            <div className="p-3 border-r border-[#1f1f1f]">
              <p className="text-sm font-semibold text-white line-clamp-1">{ch.name}</p>
              <p className="text-xs text-[#8a8a8a]">{ch.country.flag} {ch.region}</p>
            </div>
            <div className="p-2 flex gap-2 overflow-x-auto">
              {ch.schedule.map(it=>{
                const prog=getProgram(it.programId);
                const cur=getCurrentItem(ch.schedule);
                const isNow=cur?.id===it.id;
                return <Link key={it.id} href={`/tv/canais/${ch.slug}`} className={`shrink-0 rounded-lg border px-3 py-2 min-w-[160px] ${isNow ? "bg-[#e50914] border-[#e50914] text-white" : "bg-[#141414] border-[#222] text-white hover:bg-[#1a1a1a]"}`}>
                  <p className="text-xs font-semibold line-clamp-1">{prog?.title}</p>
                  <p className="text-[11px] opacity-70">{formatInTimezone(it.start, ch.timezone)} — {formatInTimezone(it.end, ch.timezone)}</p>
                </Link>;
              })}
              {ch.schedule.length===0 && <span className="text-xs text-[#6b6b6b] p-2">Sem programação — ao vivo 24h</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EPGMobile({ channels }: { channels:EpgChannel[] }){
  return (
    <div className="grid gap-3">
      {channels.map(ch=>{
        const cur=getCurrentItem(ch.schedule);
        const next=getNextItem(ch.schedule);
        const curP=cur? getProgram(cur.programId): null;
        const nextP=next? getProgram(next.programId): null;
        return (
          <div key={ch.id} className="rounded-xl border border-[#222] bg-[#141414] p-3">
            <p className="text-sm font-bold text-white">{ch.name} · {ch.country.flag}</p>
            {curP ? <><p className="mt-2 text-xs tracking-widest text-[#e50914] font-bold">Agora · {cur && formatInTimezone(cur.start, ch.timezone)}</p><p className="text-sm font-semibold text-white">{curP.title}</p></> : <p className="mt-2 text-xs text-[#6b6b6b]">Sem programa agora</p>}
            {nextP && <><p className="mt-2 text-xs tracking-widest text-[#6b6b6b]">Próximo · {next && formatInTimezone(next.start, ch.timezone)}</p><p className="text-sm text-white">{nextP.title}</p></>}
          </div>
        );
      })}
    </div>
  );
}
