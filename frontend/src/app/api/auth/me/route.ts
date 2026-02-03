import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  console.log(token);
  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    const decoded = jwt.decode(token.value) as { exp?: number };

    if (!decoded || !decoded.exp) {
      cookieStore.delete("authToken");
      return NextResponse.json({ isLoggedIn: false });
    }

    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      cookieStore.delete("authToken");
      return NextResponse.json({ isLoggedIn: false });
    }

    return NextResponse.json({ isLoggedIn: true });
  } catch (error) {
    cookieStore.delete("authToken");
    return NextResponse.json({ isLoggedIn: false });
  }
}
