export function DocumentaryCard({ title, country, year, thumb, category }: { title:string; country:string; year:string; thumb:string; category:string }){
  return (
    <div tabIndex={0} data-focusable="true" className="group flex gap-3 overflow-hidden rounded-xl border border-[#222] bg-[#141414] p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">
      <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-lg bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt={title} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.03] transition"/>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] tracking-widest text-[#8a8a8a]">{category} · {country} · {year}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-white leading-snug">{title}</h3>
      </div>
    </div>
  );
}
