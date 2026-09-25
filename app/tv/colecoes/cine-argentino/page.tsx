import { argflixTitles, argflixUrl } from "@/lib/catalog/argflix";
import { UniversalPlayer } from "@/lib/player/UniversalPlayer";
export default function Page(){
  const playlist = { id:"cine-ar-pl", title:"Cine Argentino — Playlist", provider:"youtube" as const, sourceUrl:"https://www.youtube.com/playlist?list=PLj9stbUOTbCuRN8CqKn_t93L5MvhPf98U", thumbnail:"https://i.ytimg.com/vi/UXnAJqXF4VU/hqdefault.jpg", isLive:false };
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Cine Argentino — catálogo completo Argflix</h1>
      <p className="text-sm text-[#8a8a8a]">Playlist embedada (videoseries oficial) + {argflixTitles.length} títulos extraídos do Argflix com link para a página oficial de cada obra. Player Argflix via JS não expõe IDs estáticos — respeitamos e linkamos.</p>
      <UniversalPlayer source={playlist as any} aspect="16:9" />
      <div className="grid md:grid-cols-2 gap-3">
        {argflixTitles.map(t=> (
          <a key={t.slug} href={argflixUrl(t.slug)} target="_blank" rel="noreferrer" className="rounded-xl border border-[#222] bg-[#141414] p-4 hover:border-[#e50914]/60">
            <p className="text-[11px] tracking-widest text-[#e50914] font-bold">{t.kind.toUpperCase()}</p>
            <p className="mt-1 text-sm font-bold text-white">{t.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#8a8a8a] line-clamp-3">{t.synopsis}</p>
            <p className="mt-2 text-xs text-white">Ver no Argflix ↗</p>
          </a>
        ))}
      </div>
    </div>
  );
}
