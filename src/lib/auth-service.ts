// lib/auth-service.ts
import pool, { comparePassword } from "@/lib/auth";
import { hashPassword, signToken } from "@/lib/auth";

export async function registerUser({ username, email, password }: any) {
  const normalizedEmail = email.toLowerCase().trim();
  const cleanUsername = username.trim();

  const existing = await pool.query(
    `SELECT id FROM users WHERE email = $1`,
    [normalizedEmail]
  );

  if (existing.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(password);

  const result = await pool.query(
    `INSERT INTO users (username, email, password, role)
     VALUES ($1, $2, $3, 'user')
     RETURNING id, role`,
    [cleanUsername, normalizedEmail, hashed]
  );

  const user = result.rows[0];

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  return { token };
}

export async function loginUser({ email, password }: any) {
  const normalizedEmail = email.toLowerCase().trim();

  const result = await pool.query(
    `SELECT id, password, role FROM users WHERE email = $1`,
    [normalizedEmail]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = result.rows[0];

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  return { token };
}