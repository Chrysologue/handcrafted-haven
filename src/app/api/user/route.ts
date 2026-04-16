// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "@/lib/auth";
// import pool from "@/lib/auth";

// export async function GET(request: NextRequest) {
//   try {
//     const cookieStore = request.cookies;
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }

//     const decoded = verifyToken(token);
//     const userId = decoded.id;

//     const result = await pool.query(
//       "SELECT id, username, email, role FROM users WHERE id = $1",
//       [userId]
//     );

//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const user = result.rows[0];
//     return NextResponse.json({ user });
//   } catch (error) {
//     console.error("GET USER ERROR:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import pool from "@/lib/auth";
import { cookies } from "next/headers"; // Add this import

export async function GET(request: NextRequest) {
  try {
    // Use the new async cookies() API instead of request.cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const result = await pool.query(
      "SELECT id, username, email, role FROM users WHERE id = $1",
      [userId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = result.rows[0];
    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET USER ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
