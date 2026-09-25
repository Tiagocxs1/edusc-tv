import { NextResponse } from "next/server";
import { sourceRegistry } from "@/lib/discovery/registry";
import { discoverSource, normalizeItem, validateNormalized } from "@/lib/discovery/engine";
// GET /api/discovery/jobs -> simula queue/worker
export async function GET(){
  const jobs=await Promise.all(sourceRegistry.filter(s=>s.enabled).slice(0,3).map(async src=>{
    try{
      const items=await discoverSource(src);
      const normalized=items.map(it=> normalizeItem(it, src.connector));
      const validated=normalized.map(n=> validateNormalized(n));
      return { sourceId: src.id, source: src.name, status:"completed", itemsFound: items.length, items: normalized.slice(0,3), validated };
    }catch(e:any){
      return { sourceId: src.id, source: src.name, status:"failed", error: String(e?.message||e) };
    }
  }));
  return NextResponse.json({ jobs, summary:{ total:jobs.length, found: jobs.reduce((a:any,b:any)=> a+(b.itemsFound||0),0) }});
}
