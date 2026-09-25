import type { Movie } from "@/types";
import Link from "next/link";
export function MovieCard({ movie }: { movie: Movie }) {
  // Netflix-like: poster 2/3 (cartaz oficial), nunca thumbnail 16/9. Link vai para página do filme com IMDb/TMDB.
  const slug = movie.id;
  return (
    <Link href={`/tv/filmes/${slug}`} tabIndex={0} data-focusable="true" className="group overflow-hidden rounded-xl border border-[#222] bg-[#141414] hover:border-[#e50914]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={movie.thumbnail} alt={`Pôster — ${movie.title}`} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.03]" />
        <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-white border border-white/20">FILME</span>
        <span className="absolute bottom-2 left-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">{movie.year}</span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-bold text-white">{movie.title}</h3>
        <p className="mt-1 text-xs text-[#8a8a8a] line-clamp-1">{movie.countryId?.toUpperCase()} · {movie.category}</p>
        {movie.director && <p className="mt-0.5 text-xs text-[#8a8a8a] line-clamp-1">Dir. {movie.director}</p>}
      </div>
    </Link>
  );
}
