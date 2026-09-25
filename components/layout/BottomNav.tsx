"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const ITEMS=[
  { href:"/tv", label:"Início", icon:"⌂" },
  { href:"/tv/ao-vivo", label:"Ao Vivo", icon:"●" },
  { href:"/tv/canais", label:"Explorar", icon:"▦" },
  { href:"/tv/programacao", label:"Guia", icon:"≡" },
];
export function BottomNav(){
  const p=usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[#1f1f1f] bg-[#0a0a0a]/95 backdrop-blur">
      <div className="grid grid-cols-4">
        {ITEMS.map(it=> {
          const active=p===it.href;
          return <Link key={it.href} href={it.href} className={`flex flex-col items-center py-2 text-[11px] font-medium ${active? "text-white":"text-[#8a8a8a]"}`}>
            <span className={`text-lg ${active? "text-[#e50914]":""}`}>{it.icon}</span>{it.label}
          </Link>;
        })}
      </div>
    </nav>
  );
}
