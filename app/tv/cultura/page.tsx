import Link from "next/link";
export default function Page(){
  const subs=[
    { slug:"musica", label:"Música", desc:"Shows, concertos, festivais" },
    { slug:"teatro", label:"Teatro", desc:"Peças e dramaturgia" },
    { slug:"danca", label:"Dança", desc:"Companhias e festivais" },
    { slug:"literatura", label:"Literatura", desc:"Feiras e entrevistas" },
    { slug:"patrimonio", label:"Patrimônio", desc:"Museus e memória" },
  ];
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Cultura</h1>
      <p className="text-sm text-[#8a8a8a]">Artes, música, literatura, teatro, dança, patrimônio, história e povos originários — curadoria editorial.</p>
      <div className="grid md:grid-cols-3 gap-4">{subs.map(s=> <Link key={s.slug} href={`/tv/cultura/${s.slug}`} className="rounded-xl border border-[#222] bg-[#141414] p-4 hover:border-[#333]"><p className="font-bold text-white">{s.label}</p><p className="text-xs text-[#8a8a8a]">{s.desc}</p></Link>)}</div>
    </div>
  );
}
