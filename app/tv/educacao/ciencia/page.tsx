import { catalog } from "@/lib/catalog/mockCatalog";
import { VerticalCard } from "@/components/catalog/CatalogCard";
export default function Page(){
  const items=catalog.filter(c=> c.tags.includes("Ciência") || c.contentType==="lecture" || c.contentType==="course");
  return <div className="py-6 space-y-6"><h1 className="text-2xl font-black">Educação · Ciência</h1><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(c=> <VerticalCard key={c.id} item={c} />)}</div>{items.length===0 && <p className="text-sm text-[#6b6b6b]">Conteúdos científicos em breve.</p>}</div>;
}
