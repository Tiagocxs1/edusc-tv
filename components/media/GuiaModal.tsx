"use client";
export function GuiaModal({ open, onClose }: { open:boolean; onClose:()=>void }){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur p-4 grid place-items-center" onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className="w-full max-w-2xl max-h-[80vh] overflow-auto rounded-2xl border border-[#222] bg-[#0f0f0f] p-6">
        <div className="flex items-center justify-between"><h2 className="text-lg font-black">GUIA</h2><button onClick={onClose} className="rounded-full border border-[#222] px-3 py-1 text-sm hover:bg-white hover:text-black">Fechar (ESC)</button></div>
        <div className="mt-4 space-y-4 text-sm">
          {[
            { canal:"Canal 10 Córdoba 🇦🇷", prog:[["17:00","Universidad y Cultura"],["18:00","Notícias"],["19:00","Documentário"]] },
            { canal:"TV Brasil 🇧🇷", prog:[["17:00","Cultura Viva"],["18:30","Música Popular"]] },
          ].map(g=> <div key={g.canal} className="rounded-xl border border-[#222] bg-[#141414] p-3"><p className="font-semibold text-white">{g.canal}</p><div className="mt-2 grid gap-1">{g.prog.map(([h,t])=> <div key={h} className="flex gap-3 text-[#8a8a8a]"><span className="text-white font-medium">{h}</span>{t}</div>)}</div></div>)}
        </div>
        <p className="mt-3 text-xs text-[#6b6b6b]">Navegue com D-pad ↑↓ e Enter. CH+/CH- para zapear (Parte 3 troca streams reais).</p>
      </div>
    </div>
  );
}
