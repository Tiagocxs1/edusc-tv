import { NextRequest, NextResponse } from "next/server";
import { catalog } from "@/lib/catalog/mockCatalog";
// GET /api/content?country=argentina&type=shortFilm&region=patagonia&category=cinema&q=memoria&page=1&limit=12&sort=year&order=desc
export async function GET(req: NextRequest){
  const sp=new URL(req.url).searchParams;
  const country=sp.get("country");
  const region=sp.get("region");
  const type=sp.get("type");
  const category=sp.get("category");
  const q=sp.get("q")||sp.get("search");
  const page=Math.max(1, parseInt(sp.get("page")||"1",10));
  const limit=Math.min(50, Math.max(1, parseInt(sp.get("limit")||"12",10)));
  const sort=sp.get("sort")||"year";
  const order=sp.get("order")==="asc" ? 1 : -1;

  let items=[...catalog];
  if(country) items=items.filter(c=> c.country.toLowerCase()===country.toLowerCase());
  if(region) items=items.filter(c=> c.regions.some(r=> r.toLowerCase()===region.toLowerCase()));
  if(type) items=items.filter(c=> c.contentType===type);
  if(category) items=items.filter(c=> c.genres.some(g=> g.toLowerCase()===category.toLowerCase()) || c.tags.some(t=> t.toLowerCase()===category.toLowerCase()));
  if(q){
    const lo=q.toLowerCase();
    items=items.filter(c=> `${c.title} ${c.synopsis} ${c.director||""}`.toLowerCase().includes(lo));
  }
  const allowed=["year","title","durationMin"];
  const s=allowed.includes(sort) ? sort : "year";
  items.sort((a:any,b:any)=>{
    const av=a[s]??"", bv=b[s]??"";
    if(av < bv) return -1*order;
    if(av > bv) return 1*order;
    return 0;
  });
  const total=items.length;
  return NextResponse.json({ data: items.slice((page-1)*limit, page*limit), pagination:{page,limit,total,pages:Math.ceil(total/limit)} });
}
