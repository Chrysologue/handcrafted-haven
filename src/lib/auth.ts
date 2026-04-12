import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!;

interface JwtPayload {
  id: string;
  role: "admin" | "user";
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
    issuer: "wdd430",
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET_KEY) as JwtPayload;
}