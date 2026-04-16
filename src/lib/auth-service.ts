import pool, { comparePassword, hashPassword, signToken } from "@/lib/auth";

type UserRole = "admin" | "user";

interface AuthInput {
  email: string;
  password: string;
}

interface RegisterInput extends AuthInput {
  username: string;
}

interface AuthResponse {
  token: string;
}

export async function registerUser({
  username,
  email,
  password,
}: RegisterInput): Promise<AuthResponse> {
  if (!username || !email || !password) {
    throw new Error("Missing required fields");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const cleanUsername = username.trim();

  const existing = await pool.query(`SELECT id FROM users WHERE email = $1`, [
    normalizedEmail,
  ]);

  if (existing.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const result = await pool.query(
    `INSERT INTO users (username, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, role`,
    [cleanUsername, normalizedEmail, hashedPassword, "user"],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("User creation failed");
  }

  const token = signToken({
    id: user.id,
    role: user.role as UserRole,
  });

  return { token };
}

export async function loginUser({
  email,
  password,
}: AuthInput): Promise<AuthResponse> {
  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const result = await pool.query(
    `SELECT id, password, role FROM users WHERE email = $1`,
    [normalizedEmail],
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = result.rows[0];

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({
    id: user.id,
    role: user.role as UserRole,
  });

  return { token };
}
