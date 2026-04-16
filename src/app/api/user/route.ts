import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import pool from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log("API User - Token received:", token ? "present" : "missing");

    if (!token) {
      console.log("API User - No token provided");
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    console.log("API User - Token verified for user:", decoded.id);

    const userId = parseInt(decoded.id.toString());

    const result = await pool.query(
      "SELECT id, username, email, role FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      console.log("API User - User not found");
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log("API User - User data retrieved");
    return NextResponse.json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("GET USER ERROR:", error);
    console.log("API User - Error occurred");

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
