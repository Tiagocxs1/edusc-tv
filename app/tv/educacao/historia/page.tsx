import { catalog } from "@/lib/catalog/mockCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";
export default function Page(){
  const items=catalog.filter(c=> c.contentType==="documentary" && c.tags.includes("Patrimônio"));
  return <div className="py-6 space-y-6"><h1 className="text-2xl font-black">Educação · História</h1><p className="text-sm text-[#8a8a8a]">Por país, período e região — sem opinião política automática.</p><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(c=> <VerticalCard key={c.id} item={c} />)}</div></div>;
}
