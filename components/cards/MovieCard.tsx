import type { Movie } from "@/types";
export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div tabIndex={0} data-focusable="true" className="group overflow-hidden rounded-xl border border-[#222] bg-[#141414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={movie.thumbnail} alt={movie.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.03]" />
        <span className="absolute bottom-2 left-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">{movie.year}</span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-white">{movie.title}</h3>
        {movie.director && <p className="mt-1 text-xs text-[#8a8a8a]">Dir. {movie.director}</p>}
      </div>
    </div>
  );
}
