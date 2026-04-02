import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!;

export function signToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}

export function getUser() {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}