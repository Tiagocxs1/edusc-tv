"use client";
import { useRef } from "react";

export function CarouselDpad({ title, action, children }: { title:string; action?:React.ReactNode; children:React.ReactNode }){
  const ref=useRef<HTMLDivElement>(null);
  const scroll = (dir:1|-1)=> ref.current?.scrollBy({ left: dir* 400, behavior:"smooth" });
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-[0.16em] text-[#8a8a8a]">{title}</h2>
        <div className="flex items-center gap-2">
          {action}
          <div className="hidden md:flex gap-1">
            <button onClick={()=>scroll(-1)} aria-label="Anterior" className="grid h-7 w-7 place-items-center rounded-full border border-[#222] bg-[#141414] text-white hover:bg-white hover:text-black">‹</button>
            <button onClick={()=>scroll(1)} aria-label="Próximo" className="grid h-7 w-7 place-items-center rounded-full border border-[#222] bg-[#141414] text-white hover:bg-white hover:text-black">›</button>
          </div>
        </div>
      </div>
      <div ref={ref} tabIndex={0} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] rounded-xl"
        onKeyDown={e=>{
          if(e.key==="ArrowRight") { e.preventDefault(); scroll(1); }
          if(e.key==="ArrowLeft") { e.preventDefault(); scroll(-1); }
        }}
      >
        {children}
      </div>
    </section>
  );
}
