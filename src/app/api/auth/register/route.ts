import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword ,signToken } from "@/lib/auth";
import { cookies } from "next/headers";

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
      return NextResponse.json({ message: "Invalid username" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password too short" }, { status: 400 });
    }

    // if exists usr
    const existing = await pool.query(
      `SELECT id FROM users WHERE email = $1`,
      [normalizedEmail]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, 'user')
       RETURNING id, role`,
      [cleanUsername, normalizedEmail, hashed]
    );

    const user = result.rows[0];

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json({ message: "User created" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}