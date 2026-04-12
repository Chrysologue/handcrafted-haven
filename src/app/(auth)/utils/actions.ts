"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

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

  const { email, password } = parsed.data;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        password,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message || "Login failed" };
    }

    // autoredirect
    redirect("/dashboard");

  } catch (err) {
    console.error("LOGIN ACTION ERROR:", err);
    return { error: "Login failed" };
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

  const { username, email, password } = parsed.data;

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message || "Registration failed" };
    }

    // autoredirect
    redirect("/dashboard");

  } catch (err) {
    console.error("REGISTER ACTION ERROR:", err);
    return { error: "Registration failed" };
  }
}

// =======================
// LOGOUT
// =======================

export async function logoutAction() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    redirect("/login");

  } catch (err) {
    console.error("LOGOUT ACTION ERROR:", err);
    return { error: "Logout failed" };
  }
}