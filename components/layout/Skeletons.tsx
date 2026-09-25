export function CardSkeleton(){ return <div className="animate-pulse rounded-xl border border-[#222] bg-[#141414] p-3"><div className="aspect-video rounded-lg bg-[#1f1f1f]"/><div className="mt-3 h-3 w-3/4 rounded bg-[#1f1f1f]"/><div className="mt-2 h-2 w-1/2 rounded bg-[#1f1f1f]"/></div>; }
export function HeroSkeleton(){ return <div className="animate-pulse rounded-2xl border border-[#222] bg-[#0f0f0f] h-[420px]"/>; }
export function EmptyState({ title, desc }: { title:string; desc:string }){
  return <div className="rounded-xl border border-dashed border-[#333] p-8 text-center"><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm text-[#8a8a8a]">{desc}</p></div>;
}
