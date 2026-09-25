import { NextRequest, NextResponse } from "next/server";
import { sourceRegistry, detectConnectorType } from "@/lib/discovery/registry";
export async function GET(){
  return NextResponse.json({ data: sourceRegistry });
}
export async function POST(req: NextRequest){
  const body=await req.json();
  const url=String(body.url||"");
  if(!url) return NextResponse.json({ error:{ code:"BAD_REQUEST", message:"URL obrigatória" }},{ status:400 });
  const type=detectConnectorType(url);
  // light auto-detect: verifica RSS link e sitemap na origem (best effort)
  let detected:{ rss?:string; sitemap?:string; ogTitle?:string }={};
  try{
    const res=await fetch(url, { next:{ revalidate: 60 } as any });
    const html=await res.text();
    const rss=html.match(/rel=["']alternate["'][^>]*href=["']([^"']+)["']/i)?.[1];
    const og=html.match(/property=["']og:title["'] content=["']([^"']+)["']/i)?.[1];
    if(rss) detected.rss=rss;
    if(og) detected.ogTitle=og;
  }catch{}
  return NextResponse.json({ detected: { connector: type, url }, meta: detected, message:"Fonte candidata — validar embed/rights antes de publicar" });
}
