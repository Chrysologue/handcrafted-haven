// import { NextResponse } from "next/server";
// import pool from "@/lib/auth";
// import { comparePassword,signToken } from "@/lib/auth";
// import { cookies } from "next/headers";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ message: "Missing fields" }, { status: 400 });
//     }

//     const normalizedEmail = email.toLowerCase().trim();

//     if (!normalizedEmail.includes("@")) {
//       return NextResponse.json({ message: "Invalid email" }, { status: 400 });
//     }

//     const result = await pool.query(
//       `SELECT * FROM users WHERE email = $1`,
//       [normalizedEmail]
//     );

//     const user = result.rows[0];

//     const fakeHash = "$2b$10$abcdefghijklmnopqrstuv";
//     const hashToCompare = user ? user.password : fakeHash;

//     const isValid = await comparePassword(password, hashToCompare);

//     if (!user || !isValid) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
//     }

//     const token = signToken({
//       id: user.id,
//       role: user.role,
//     });

//     const cookieStore = await cookies();

//     cookieStore.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: 60 * 60, // 1H
//     });

//     return NextResponse.json({ message: "Logged in" });

//   } catch (err) {
//     console.error("LOGIN ERROR:", err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import pool from "@/lib/auth";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      normalizedEmail,
    ]);

    const user = result.rows[0];

    const fakeHash = "$2b$10$abcdefghijklmnopqrstuv";
    const hashToCompare = user ? user.password : fakeHash;

    const isValid = await comparePassword(password, hashToCompare);

    if (!user || !isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Fix: Convert id to string when creating token
    const token = signToken({
      id: user.id.toString(), // ← Convert number to string
      role: user.role,
    });

    // Create response
    const response = NextResponse.json({
      message: "Logged in",
      success: true,
    });

    // Set cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      {
        message: "Server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
