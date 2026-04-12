import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

if (!process.env.SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined");
}

const SECRET_KEY = process.env.SECRET_KEY;

interface JwtPayload {
  id: string;
  role: "admin" | "user";
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (
    (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
    token
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = jwt.verify(token, SECRET_KEY) as JwtPayload;

    if (!user || !user.role) {
      throw new Error("Invalid token structure");
    }

    if (pathname.startsWith("/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (err: any) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};