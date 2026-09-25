export function ProgramCard({ title, channel, time, category, thumb, isLive }: { title:string; channel:string; time:string; category:string; thumb:string; isLive?:boolean }){
  return (
    <div tabIndex={0} data-focusable="true" className="group relative overflow-hidden rounded-xl border border-[#222] bg-[#141414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">
      <div className="relative aspect-video overflow-hidden bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt={title} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.03] transition"/>
        {isLive && <span className="absolute left-2 top-2 rounded bg-[#e50914] px-1.5 py-0.5 text-[10px] font-bold text-white">● AO VIVO</span>}
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">{time}</span>
      </div>
      <div className="p-3">
        <p className="text-[11px] tracking-widest text-[#e50914] font-bold">{category.toUpperCase()}</p>
        <h3 className="line-clamp-2 text-sm font-semibold text-white leading-snug">{title}</h3>
        <p className="mt-1 text-xs text-[#8a8a8a]">{channel}</p>
      </div>
    </div>
  );
}
