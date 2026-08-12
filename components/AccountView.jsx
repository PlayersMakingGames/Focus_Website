"use client";

import { useAuth } from "@/lib/AuthContext";
import LoginForm from "@/components/LoginForm";

export default function AccountView() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return <p className="mt-8 text-sm text-white/50">Loading…</p>;
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="hud-cut mt-8 max-w-sm border border-white/10 bg-white/[0.03] p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-white/40">
        Signed in as
      </div>
      <div className="mt-1.5 text-sm text-white">{user.email}</div>
      <button
        type="button"
        onClick={() => signOut()}
        className="hud-cut-sm mt-5 border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white/40"
      >
        Sign Out
      </button>
    </div>
  );
}
