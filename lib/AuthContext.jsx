"use client";

// Direct port of FocusSim/src/AuthContext.jsx, trimmed to what this site
// needs: sign in / sign out against the same Supabase project FocusSim
// itself uses, so a session here is the same account there. No signUp, no
// Google OAuth, no password reset — the closed-alpha invite-code gate
// applies at signup, so new accounts are still created in FocusSim or via
// the alpha signup form, not this site.
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    async signIn(email, password) {
      return supabase.auth.signInWithPassword({ email, password });
    },
    async signOut() {
      return supabase.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
