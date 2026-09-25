import type { Content } from "@/types";
import { mockContents } from "@/lib/mock-data";

export function Hero({ featured }: { featured?: Content }) {
  const item = featured ?? mockContents[0];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#222] bg-[#0f0f0f]">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.thumbnail} alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </div>
      <div className="relative flex min-h-[380px] md:min-h-[460px] flex-col justify-end p-6 md:p-10">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e50914] px-3 py-1 text-xs font-bold tracking-widest text-white">▶ DESTAQUE · {item.category.toUpperCase()}</span>
        <h1 className="mt-4 max-w-3xl text-2xl md:text-4xl font-black leading-tight text-white">{item.title}</h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-[#d0d0d0]">{item.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={item.url || "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:bg-[#e5e5e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">▶ Assistir agora</a>
          <span className="text-xs text-white/70 border border-white/20 rounded-full px-3 py-1">{item.provider} · {item.duration ?? "—"}</span>
          <span className="text-xs text-white/60">Sem hospedagem pirata — reprodução incorporada oficial quando permitida</span>
        </div>
      </div>
    </div>
  );
}
