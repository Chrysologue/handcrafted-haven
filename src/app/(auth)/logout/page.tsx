"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // important for cookies
      });

      router.replace("/login");
    };

    handleLogout();
  }, [router]);

  return <p>Logging out...</p>;
}