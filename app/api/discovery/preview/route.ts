import { NextRequest, NextResponse } from "next/server";
import { getConnector } from "@/lib/discovery/engine";
// POST { url, type } -> preview itens sem importar
export async function POST(req: NextRequest){
  const { url, type="website" } = await req.json();
  if(!url) return NextResponse.json({ error:{ code:"BAD_REQUEST", message:"url required"}},{status:400});
  const c=getConnector(type);
  const items=await c.discover(url);
  const preview=items.slice(0,20).map((it:any)=> c.normalize(it));
  return NextResponse.json({ preview, rawCount: items.length });
}
