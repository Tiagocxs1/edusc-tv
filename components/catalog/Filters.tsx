"use client";
export function FilterChip({ active, onClick, children }: { active?:boolean; onClick:()=>void; children:React.ReactNode }){
  return <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${active ? "bg-white text-black border-white" : "bg-[#141414] text-[#8a8a8a] border-[#222] hover:text-white"}`}>{children}</button>;
}
