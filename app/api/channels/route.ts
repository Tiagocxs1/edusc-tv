import { NextRequest, NextResponse } from "next/server";
import { epgChannels } from "@/lib/epg/mockChannels";
// GET /api/channels?country=argentina&category=Cultural&live=1&page=1&limit=12&search=cordoba
export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const country=searchParams.get("country");
  const category=searchParams.get("category");
  const live=searchParams.get("live");
  const search=searchParams.get("search");
  const page=Math.max(1, parseInt(searchParams.get("page")||"1",10));
  const limit=Math.min(50, Math.max(1, parseInt(searchParams.get("limit")||"12",10)));
  const sort=searchParams.get("sort")||"channelNumber";
  const order=searchParams.get("order")==="desc" ? -1 : 1;

  let items=[...epgChannels];
  if(country) items=items.filter(c=> c.country.slug===country);
  if(category) items=items.filter(c=> c.category.toLowerCase()===category.toLowerCase());
  if(live==="1") items=items.filter(c=> c.status==="LIVE");
  if(search) items=items.filter(c=> `${c.name} ${c.region} ${c.country.name}`.toLowerCase().includes(search.toLowerCase()));

  // whitelist sort
  const allowed=["channelNumber","name","country"];
  const s = allowed.includes(sort) ? sort : "channelNumber";
  items.sort((a:any,b:any)=>{
    const av=a[s] ?? "", bv=b[s] ?? "";
    if(av < bv) return -1*order;
    if(av > bv) return 1*order;
    return 0;
  });

  const total=items.length;
  const paged=items.slice((page-1)*limit, page*limit);
  return NextResponse.json({ data: paged, pagination:{ page, limit, total, pages: Math.ceil(total/limit) }});
}
