import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("authToken");
  return NextResponse.json({ isLoggedIn: !!token });
}
