// import { NextResponse } from "next/server";
// import pool from "@/lib/auth";
// import { comparePassword, signToken } from "@/lib/auth";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { message: "Missing fields" },
//         { status: 400 }
//       );
//     }

//     const normalizedEmail = email.toLowerCase().trim();

//     if (!normalizedEmail.includes("@")) {
//       return NextResponse.json(
//         { message: "Invalid email" },
//         { status: 400 }
//       );
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
//       return NextResponse.json(
//         { message: "Invalid credentials" },
//         { status: 401 }
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
//       { status: 500 }
//     );
//   }
// }

// app/api/login/route.ts
import { NextResponse } from "next/server";
import pool, { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log("Login API - Started for email:", email);
    console.log("Database URL exists:", !!process.env.DATABASE_URL);
    console.log("NODE_ENV:", process.env.NODE_ENV);

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    console.log("Login API - Querying database...");
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      normalizedEmail,
    ]);
    console.log("Login API - Query result rows:", result.rows.length);

    const user = result.rows[0];

    const fakeHash = "$2b$10$abcdefghijklmnopqrstuv";
    const hashToCompare = user ? user.password : fakeHash;

    const isValid = await comparePassword(password, hashToCompare);
    console.log("Login API - Password valid:", isValid);

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
    console.log("Login API - Token created, setting cookie");

    const response = NextResponse.json({
      message: "Logged in",
      success: true,
    });

    // Try a simpler cookie setting approach
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true, // Always true on Vercel (HTTPS)
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    console.log("Login API - Cookie set, returning response");
    return response;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    console.error("Error details:", JSON.stringify(err, null, 2));

    return NextResponse.json(
      {
        message: "Server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
