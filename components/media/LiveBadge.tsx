export function LiveBadge({ size="sm" }: { size?: "sm"|"md" }){
  return <span className={`inline-flex items-center gap-1 rounded bg-[#e50914] font-bold tracking-widest text-white ${size==="sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"}`}>
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"/> AO VIVO
  </span>;
}
export function LiveDot(){ return <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[#e50914] shadow-[0_0_8px_rgba(229,9,20,0.8)]"/>; }
