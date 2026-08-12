"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function LoginForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error: err } = await signIn(email, password);
    setBusy(false);
    if (err) setError(err.message);
  }

  return (
    <form onSubmit={handleSubmit} className="hud-cut mt-8 max-w-sm border border-white/10 bg-white/[0.03] p-6">
      <label className="block text-xs font-semibold uppercase tracking-wide text-white/40">
        Email
      </label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1.5 w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
      />

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-white/40">
        Password
      </label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1.5 w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
      />

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="hud-cut-sm mt-5 w-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 disabled:opacity-50"
      >
        {busy ? "Signing in…" : "Sign In"}
      </button>

      <p className="mt-4 text-xs text-white/40">
        Use your existing Focus Online account — this site doesn&rsquo;t
        create new accounts (Focus is in closed alpha and signup needs an
        invite code, handled in the app itself).
      </p>
    </form>
  );
}
