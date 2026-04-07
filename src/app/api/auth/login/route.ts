import { NextResponse } from "next/server";
import pool from '../lib/db'
import { comparePassword } from "../lib/hash";
import { signToken } from "../lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];

    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ message: "Logged in" });

  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}