'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}