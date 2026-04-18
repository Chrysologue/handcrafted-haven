export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-10">
      
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <LogoutButton />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Card title="Welcome">
            You are logged in successfully.
          </Card>

          <Card title="Session">
            Your session is active and secure.
          </Card>

        </div>

      </div>
    </div>
  );
}

function Card({ title, children }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg backdrop-blur">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-400 text-sm">{children}</p>
    </div>
  );
}