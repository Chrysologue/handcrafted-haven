import jwt from "jsonwebtoken";
import {hash, compare} from 'bcryptjs';

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

 
export async function hashPassword(password:string) {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(password:string, hashedPassword:string) {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
}

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;