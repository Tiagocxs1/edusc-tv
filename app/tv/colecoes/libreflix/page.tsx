import { libreTitles } from "@/lib/catalog/libreflix";
export default function Page(){
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Libreflix — cinema livre (CC)</h1>
      <p className="text-sm text-[#8a8a8a]">Obras com licenças livres. Player via JS sem MP4 estático — listamos com atribuição e link para assistir na plataforma com a licença de cada obra.</p>
      <div className="grid md:grid-cols-2 gap-3">
        {libreTitles.map(t=> (
          <a key={t.title} href="https://libreflix.org/" target="_blank" rel="noreferrer" className="rounded-xl border border-[#222] bg-[#141414] p-4 hover:border-[#e50914]/60">
            <p className="text-[11px] tracking-widest text-[#e50914] font-bold">{t.year} · {t.duration} MIN</p>
            <p className="mt-1 text-sm font-bold text-white">{t.title}</p>
            <p className="text-xs text-[#8a8a8a]">Dir. {t.director} · {t.tags}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#8a8a8a] line-clamp-3">{t.synopsis}</p>
            <p className="mt-2 text-xs text-white">Assistir na Libreflix ↗</p>
          </a>
        ))}
      </div>
    </div>
  );
}
