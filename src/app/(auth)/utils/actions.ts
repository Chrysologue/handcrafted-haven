"use server";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function registerAction(form: FormData) {
  const username = form.get("username") as string;
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  if (!username || !email || !password) {
    return { error: "All fields are required" };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message || "Registration failed" };
    }

    const result = await res.json();
    return { success: true, data: result };

  } catch (err) {
    return { error: "Registration failed" };
  }
}

export async function loginAction(form: FormData) {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message || "Login failed" };
    }

    const result = await res.json();
    return { success: true, data: result };

  } catch (err) {
    return { error: "Login failed" };
  }
}


export async function logoutAction() {
  try {
    
  await fetch(`${BASE_URL}/api/auth/logout`, {
  method: "POST",
});

    return { success: true };
  } catch (err) {
    return { error: "Logout failed" };
  }
}