import { sourceVerdicts } from "@/lib/sources/legal";
import Link from "next/link";
export default function Page(){
  const badge = (s:string)=> s==="embed" ? "bg-green-700 text-white" : s==="link-only" ? "bg-[#333] text-white" : s==="review" ? "bg-yellow-600 text-black" : "bg-[#222] text-[#8a8a8a]";
  const label = (s:string)=> s==="embed" ? "EMBED PERMITIDO" : s==="link-only" ? "SÓ LINK EXTERNO" : s==="review" ? "EM REVISÃO" : "SÓ METADADOS";
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Fontes verificadas</h1>
      <p className="text-sm text-[#8a8a8a]">Verificação em 2026-09-25. Embed só com permissão da fonte. Login/DRM nunca contornados. Playlists YouTube via <code>videoseries</code> oficial.</p>
      <div className="grid gap-3">
        {sourceVerdicts.map(v=> (
          <div key={v.id} className="rounded-xl border border-[#222] bg-[#141414] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-bold text-white">{v.name}</p>
              <span className={`rounded px-2 py-0.5 text-[11px] font-bold ${badge(v.status)}`}>{label(v.status)}</span>
            </div>
            <p className="mt-2 text-sm text-[#d0d0d0]">{v.reason}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <a href={v.url} target="_blank" rel="noreferrer" className="rounded-full border border-[#333] bg-[#0a0a0a] px-3 py-1 text-xs text-white hover:bg-white hover:text-black">Abrir fonte original ↗</a>
              {v.playlistId && <Link href={`/tv/filmes/playlist-${v.playlistId.slice(0,8)}`} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">Ver coleção playlist →</Link>}
            </div>
            {v.note && <p className="mt-2 text-xs text-[#6b6b6b]">{v.note}</p>}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-[#222] bg-[#0f0f0f] p-4 text-sm text-[#8a8a8a]">
        <p className="font-bold text-white">Coleções via playlist</p>
        <p className="mt-1">Cine Argentino e Acervo ACAU com reprodução incorporada. Títulos de terceiros passam por revisão antes da publicação.</p>
      </div>
    </div>
  );
}
