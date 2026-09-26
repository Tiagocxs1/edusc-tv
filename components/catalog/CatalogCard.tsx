import Link from "next/link";
import type { CatalogItem, Collection } from "@/lib/catalog/types";
export function VerticalCard({ item }: { item:CatalogItem }){
  const external = !item.source.embedAllowed;
  const inner = (
    <>
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        {item.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.poster} alt={item.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.03] transition"/>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-3 text-center">
            <p className="text-[10px] tracking-[0.2em] text-[#e50914] font-bold">{item.genres[0]?.toUpperCase() || item.contentType.toUpperCase()}</p>
            <p className="mt-2 text-3xl text-[#333] font-black">▶</p>
            <p className="mt-1 text-[11px] text-[#6b6b6b]">{item.durationMin ? `${item.durationMin} min` : item.country}</p>
          </div>
        )}
        <span className="absolute bottom-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] text-white border border-white/10">{item.contentType}</span>
        {external && <span className="absolute top-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white border border-white/20">↗ FONTE</span>}
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">{item.title}</p>
        <p className="mt-1 text-xs text-[#8a8a8a]">{item.country} · {item.year || "—"} · {item.durationMin ? `${item.durationMin} min` : "—"}</p>
      </div>
    </>
  );
  const cls = "group overflow-hidden rounded-xl border border-[#222] bg-[#141414] hover:border-[#e50914]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]";
  if(external){
    return <a href={item.source.sourceUrl} target="_blank" rel="noreferrer" className={cls} tabIndex={0} data-focusable="true">{inner}</a>;
  }
  return <Link href={`/tv/filmes/${item.slug}`} className={cls} tabIndex={0} data-focusable="true">{inner}</Link>;
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
