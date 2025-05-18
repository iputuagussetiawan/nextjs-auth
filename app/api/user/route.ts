import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user=await currentUser();
  if(user){
    return new NextResponse(JSON.stringify(user), { status: 200 });
  }
}