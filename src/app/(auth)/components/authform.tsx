'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, registerAction } from "../utils/actions";
import Button from "./button";
import InputForm from "./input";
import { Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";

const initialState = {
  error: "",
};

export default function AuthForm({ type }: { type: string }) {

  const [state, formAction] = useActionState(
    async (_prevState: any, form: FormData) => {
      const result =
        type === "register"
          ? await registerAction(form)
          : await loginAction(form);

      return result;
    },
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4">

      <motion.form
        action={formAction}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          {type === "register" ? "Create Account" : "Welcome Back"}
        </h1>

        {/* Username */}
        {type === "register" && (
          <InputForm
            name="username"
            placeholder="John Doe"
            icon={<User size={18} />}
          />
        )}

        {/* Email */}
        <InputForm
          name="email"
          type="email"
          placeholder="hello@mail.com"
          icon={<Mail size={18} />}
        />

        {/* Password */}
        <InputForm
          name="password"
          type="password"
          placeholder="********"
          icon={<Lock size={18} />}
        />

        {/* Error */}
        {state?.error && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-3 text-center"
          >
            {state.error}
          </motion.p>
        )}

        <SubmitButton type={type} />

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          {type === "register" ? "Already have an account?" : "Don't have an account?"}
          {" "}
          <a
            href={type === "register" ? "/login" : "/register"}
            className="text-blue-400 hover:text-blue-300 transition"
          >
            {type === "register" ? "Login" : "Register"}
          </a>
        </p>

      </motion.form>
    </div>
  );
}

function SubmitButton({ type }: { type: string }) {
  const { pending } = useFormStatus();

  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Button
        type="submit"
        disabled={pending}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-medium py-3 rounded-xl disabled:opacity-50"
      >
        {pending
          ? "Processing..."
          : type === "register"
          ? "Create Account"
          : "Login"}
      </Button>
    </motion.div>
  );
}