import { CountryCard } from "@/components/cards/CountryCard";
import { mockCountries } from "@/lib/mock-data";
export default function Page(){
  return <div className="py-6 space-y-6">
    <h1 className="text-2xl font-black">Por País</h1>
    <p className="text-sm text-[#8a8a8a]">20 países latino-americanos · produtoras independentes, universidades e canais públicos.</p>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">{mockCountries.map(c=> <CountryCard key={c.id} country={c} />)}</div>
  </div>;
}
