export function CultureCard({ title, excerpt, thumb, tag }: { title:string; excerpt:string; thumb:string; tag:string }){
  return (
    <div tabIndex={0} data-focusable="true" className="group overflow-hidden rounded-xl border border-[#222] bg-[#141414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt={title} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.03] transition"/>
        <span className="absolute left-2 top-2 rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[11px] text-white backdrop-blur">{tag}</span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">{title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#8a8a8a]">{excerpt}</p>
      </div>
    </div>
  );
}
