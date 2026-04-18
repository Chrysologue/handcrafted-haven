import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import pool from "@/lib/auth";

const SECRET_KEY = process.env.SECRET_KEY!;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: string;
      role: string;
    };

    // Get user from database
    const result = await pool.query(
      "SELECT id, username, email, role FROM users WHERE id = $1",
      [decoded.id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = result.rows[0];

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
