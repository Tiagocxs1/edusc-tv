import { NextRequest, NextResponse } from "next/server";
import { epgChannels } from "@/lib/epg/mockChannels";
import { getCurrentItem, getNextItem } from "@/lib/epg/helpers";
// GET /api/schedule?channel=cordoba-cultural&now=2026-09-25T17:30:00Z
export async function GET(req: NextRequest){
  const sp=new URL(req.url).searchParams;
  const channelId=sp.get("channel");
  const nowParam=sp.get("now");
  const now=nowParam ? new Date(nowParam) : new Date();
  const channels= channelId ? epgChannels.filter(c=> c.id===channelId || c.slug===channelId) : epgChannels;
  const data=channels.map(c=> ({
    channel: { id:c.id, slug:c.slug, name:c.name, timezone:c.timezone, status:c.status },
    current: getCurrentItem(c.schedule, now),
    next: getNextItem(c.schedule, now),
    schedule: c.schedule
  }));
  return NextResponse.json({ now: now.toISOString(), data });
}
