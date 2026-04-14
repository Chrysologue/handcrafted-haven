'use client';

import { logoutAction } from "../(auth)/utils/actions";
import { useFormStatus } from "react-dom";

export default function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition disabled:opacity-50"
        disabled={pending}
      >
        {pending ? "Logging out..." : "Logout"}
      </button>
    </form>
  );
}