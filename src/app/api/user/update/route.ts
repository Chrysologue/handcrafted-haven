import { NextRequest, NextResponse } from "next/server";
import { verifyToken, hashPassword } from "@/lib/auth";
import pool from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = request.cookies;
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const { username, email, password } = await request.json();

    // Validate input
    if (!username || !email) {
      return NextResponse.json({ error: "Username and email are required" }, { status: 400 });
    }

    // Check if email is already taken by another user
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1 AND id != $2",
      [email, userId]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    let updateQuery = "UPDATE users SET username = $1, email = $2";
    let params = [username, email];

    if (password) {
      const hashed = await hashPassword(password);
      updateQuery += ", password = $3";
      params.push(hashed);
    }

    updateQuery += " WHERE id = $" + (params.length + 1) + " RETURNING id, username, email, role";
    params.push(userId);

    const result = await pool.query(updateQuery, params);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = result.rows[0];
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}