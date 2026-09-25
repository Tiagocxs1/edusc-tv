import type { Country } from "@/types";
import Link from "next/link";
export function CountryCard({ country }: { country: Country }) {
  return (
    <Link href={`/tv/paises#${country.id}`} tabIndex={0} data-focusable="true" className="group flex flex-col items-center rounded-xl border border-[#222] bg-[#141414] p-4 hover:bg-[#1a1a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] text-center">
      <span className="text-3xl">{country.flag}</span>
      <span className="mt-2 text-sm font-semibold text-white">{country.name}</span>
      <span className="text-xs text-[#8a8a8a]">{country.region}</span>
    </Link>
  );
}
