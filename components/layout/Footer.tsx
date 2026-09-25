import Link from "next/link";
export function Footer(){
  return (
    <footer className="mt-16 border-t border-[#1f1f1f] bg-[#0a0a0a]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-sm font-black tracking-[0.12em]">EDUSC TV</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#8a8a8a]">Cinema, cultura, educação e televisão da América Latina. Curadoria editorial sobre conteúdos oficialmente disponíveis — sem hospedagem pirata, sem bypass de DRM.</p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-[#8a8a8a]">
            {["Sobre","Privacidade","Termos","Contato","Fontes"].map(l=> <Link key={l} href="#" className="hover:text-white">{l}</Link>)}
          </nav>
        </div>
        <p className="mt-8 text-xs text-[#5a5a5a]">© {new Date().getFullYear()} EDUSC · edusc.com.br/tv · Conteúdos de terceiros reproduzidos via embed oficial quando permitido; caso contrário: “Este conteúdo não permite reprodução incorporada.”</p>
      </div>
    </footer>
  );
}
