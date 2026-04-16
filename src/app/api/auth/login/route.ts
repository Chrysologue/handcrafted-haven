// import { NextResponse } from "next/server";
// import pool from "@/lib/auth";
// import { comparePassword, signToken } from "@/lib/auth";

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

//     const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
//       normalizedEmail,
//     ]);

//     const user = result.rows[0];

//     const fakeHash = "$2b$10$abcdefghijklmnopqrstuv";
//     const hashToCompare = user ? user.password : fakeHash;

//     const isValid = await comparePassword(password, hashToCompare);

//     if (!user || !isValid) {
//       return NextResponse.json(
//         { message: "Invalid credentials" },
//         { status: 401 },
//       );
//     }

//     const token = signToken({
//       id: user.id.toString(),
//       role: user.role,
//     });

//     const response = NextResponse.json({
//       message: "Logged in",
//       success: true,
//     });

//     response.cookies.set({
//       name: "token",
//       value: token,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60,
//     });

//     return response;
//   } catch (err) {
//     console.error("LOGIN ERROR:", err);

//     return NextResponse.json(
//       {
//         message: "Server error",
//         error: err instanceof Error ? err.message : "Unknown error",
//       },
//       { status: 500 },
//     );
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

    const token = signToken({
      id: user.id.toString(),
      role: user.role,
    });

    const response = NextResponse.json({
      message: "Logged in",
      success: true,
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    response.headers.set("X-Cookie-Set", "true");

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
