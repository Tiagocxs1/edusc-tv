import { NextResponse } from "next/server";
import { epgCountries } from "@/lib/epg/mockChannels";
export async function GET(){ return NextResponse.json({ data: epgCountries }); }
