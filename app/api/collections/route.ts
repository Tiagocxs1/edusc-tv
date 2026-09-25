import { NextResponse } from "next/server";
import { collections } from "@/lib/catalog/mockCatalog";
export async function GET(){
  return NextResponse.json({ data: collections });
}
