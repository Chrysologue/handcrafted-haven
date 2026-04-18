import { NextResponse } from "next/server";
import pool from "@/lib/auth";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanUsername = username.trim();

    if (!normalizedEmail.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    if (cleanUsername.length < 3) {
      return NextResponse.json(
        { message: "Invalid username" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password too short" },
        { status: 400 },
      );
    }

    const existing = await pool.query(`SELECT id FROM users WHERE email = $1`, [
      normalizedEmail,
    ]);

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashed = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, 'user')
       RETURNING id, role`,
      [cleanUsername, normalizedEmail, hashed],
    );

    const user = result.rows[0];

    const token = signToken({
      id: user.id.toString(),
      role: user.role,
    });

    const response = NextResponse.json({
      message: "User created",
      success: true,
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: true, // ✅ keep true for production (Vercel is HTTPS)
      sameSite: "lax", // ✅ safe default
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
