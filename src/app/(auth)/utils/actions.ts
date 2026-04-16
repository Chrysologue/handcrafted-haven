"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { loginUser, registerUser } from "@/lib/auth-service";
import { cookies } from "next/headers";

// =======================
// SCHEMAS ZOD
// =======================

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// =======================
// LOGIN
// =======================

export async function loginAction(form: FormData) {
  const data = {
    email: form.get("email"),
    password: form.get("password"),
  };

  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  try {
    const { token } = await loginUser(parsed.data);

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Login failed" };
  }
}

// =======================
// REGISTER
// =======================

export async function registerAction(form: FormData) {
  const data = {
    username: form.get("username"),
    email: form.get("email"),
    password: form.get("password"),
  };

  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  try {
    const { token } = await registerUser(parsed.data);

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Registration failed" };
  }
}

// =======================
// LOGOUT
// =======================

export async function logoutAction() {
  const cookieStore = await cookies();

  await cookieStore.set("token", "", {
    path: "/",
    maxAge: 0,
  });

  redirect("/login");
}
