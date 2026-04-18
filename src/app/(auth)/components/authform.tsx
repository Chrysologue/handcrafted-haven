"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./button";
import InputForm from "./input";
import { Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthForm({ type }: { type: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const payload =
      type === "register"
        ? {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
          }
        : {
            email: formData.get("email"),
            password: formData.get("password"),
          };

    try {
      const res = await fetch(`/api/auth/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅  ensuring cookies persist in production
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

       window.location.href = "/dashboard";
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          {type === "register" ? "Create Account" : "Welcome Back"}
        </h1>

        {type === "register" && (
          <InputForm
            name="username"
            placeholder="John Doe"
            icon={<User size={18} />}
          />
        )}

        <InputForm
          name="email"
          type="email"
          placeholder="hello@mail.com"
          icon={<Mail size={18} />}
        />

        <InputForm
          name="password"
          type="password"
          placeholder="********"
          icon={<Lock size={18} />}
        />

        {error && (
          <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : type === "register"
              ? "Create Account"
              : "Login"}
        </Button>

        <p className="text-gray-400 text-sm text-center mt-6">
          {type === "register"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <a
            href={type === "register" ? "/login" : "/register"}
            className="text-blue-400"
          >
            {type === "register" ? "Login" : "Register"}
          </a>
        </p>
      </motion.form>
    </div>
  );
}
