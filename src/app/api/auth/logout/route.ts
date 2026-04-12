import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("token");

    return NextResponse.json({ message: "Logged out" });
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}