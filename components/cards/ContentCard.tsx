import type { Content } from "@/types";

export function ContentCard({ content }: { content: Content }) {
  const badge = content.source === "youtube" ? "YT" : content.source === "vimeo" ? "VM" : content.source === "hls" ? "HLS" : "EXT";
  return (
    <div
      tabIndex={0}
      data-focusable="true"
      className="group relative overflow-hidden rounded-xl border border-[#222] bg-[#141414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
    >
      <div className="relative aspect-video overflow-hidden bg-[#0f0f0f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={content.thumbnail} alt={content.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] group-focus:scale-[1.03]" />
        <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-white border border-white/10">{badge}</span>
        {content.duration && <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">{content.duration}</span>}
        <span className="absolute inset-0 hidden group-hover:grid group-focus:grid place-items-center bg-black/30">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-black">▶</span>
        </span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">{content.title}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-[#8a8a8a]">{content.provider} · {content.category}</p>
      </div>
    </div>
  );
}
