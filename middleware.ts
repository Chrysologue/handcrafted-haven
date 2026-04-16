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

  console.log("Middleware - Path:", pathname, "Token received:", token ? "present" : "missing");

  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!token) {
    console.log("Middleware - No token, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = jwt.verify(token, SECRET_KEY) as JwtPayload;
    console.log("Middleware - Token verified for user:", user.id, "role:", user.role);

    if (!user || !user.role) {
      throw new Error("Invalid token");
    }

    if (pathname.startsWith("/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Middleware - Verify error:", error);
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
