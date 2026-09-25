import Link from "next/link";
export default function Page(){
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Educação</h1>
      <p className="text-sm text-[#8a8a8a]">Universidades, ciência, tecnologia, história, palestras e pesquisa.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { slug:"ciencia", label:"Ciência", desc:"Pesquisa, laboratórios, astronomia" },
          { slug:"historia", label:"História", desc:"Por país, período e região" },
          { slug:"", label:"Universidades", desc:"Instituições", href:"/tv/instituicoes/unc" },
        ].map(c=> <Link key={c.label} href={c.href||`/tv/educacao/${c.slug}`} className="rounded-xl border border-[#222] bg-[#141414] p-4 hover:border-[#333]"><p className="font-bold text-white">{c.label}</p><p className="text-xs text-[#8a8a8a]">{c.desc}</p></Link>)}
      </div>
    </div>
  );
}
