import Link from "next/link";
import type { CatalogItem, Collection } from "@/lib/catalog/types";
export function VerticalCard({ item }: { item:CatalogItem }){
  return (
    <Link href={`/tv/filmes/${item.slug}`} className="group overflow-hidden rounded-xl border border-[#222] bg-[#141414] hover:border-[#333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.poster} alt={item.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.03] transition"/>
        <span className="absolute bottom-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] text-white border border-white/10">{item.contentType}</span>
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">{item.title}</p>
        <p className="mt-1 text-xs text-[#8a8a8a]">{item.country} · {item.year} · {item.durationMin} min</p>
      </div>
    </Link>
  );
}
export function HorizontalCard({ item }: { item:CatalogItem }){
  return (
    <Link href={`/tv/filmes/${item.slug}`} className="group flex gap-3 overflow-hidden rounded-xl border border-[#222] bg-[#141414] p-3 hover:border-[#333]">
      <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-lg bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.backdrop} alt={item.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.03] transition"/>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] tracking-widest text-[#8a8a8a]">{item.contentType} · {item.country} · {item.year}</p>
        <p className="mt-1 line-clamp-2 text-sm font-semibold text-white">{item.title}</p>
        <p className="mt-1 line-clamp-1 text-xs text-[#8a8a8a]">{item.shortSynopsis}</p>
      </div>
    </Link>
  );
}
export function CollectionCard({ col }: { col:Collection }){
  return (
    <Link href={`/tv/colecoes/${col.slug}`} className="group overflow-hidden rounded-xl border border-[#222] bg-[#141414] hover:border-[#333]">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={col.cover} alt={col.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.03] transition"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
        <span className="absolute bottom-2 left-2 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-xs text-white backdrop-blur">{col.type}</span>
      </div>
      <div className="p-3"><p className="text-sm font-bold text-white">{col.title}</p><p className="mt-1 line-clamp-2 text-xs text-[#8a8a8a]">{col.description}</p></div>
    </Link>
  );
}
