import { NextResponse } from "next/server";
import pool from "../lib/db";
import { hashPassword } from "../lib/hash";
import { signToken } from "../lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, 'user') RETURNING id, email, role`,
      [username, email, hashed]
    );

    const user = result.rows[0];

    const token = signToken(user);

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ message: "User created", user });

  } catch (err: any) {
    if (err.message.includes("duplicate")) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}