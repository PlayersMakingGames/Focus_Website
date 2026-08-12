"use client";

// public.element_releases is the server's own source of truth for which
// Elements are live (supabase/released-elements.sql) — deliberately
// world-readable (to authenticated) so any client can know what to show.
// Mirroring it here is what keeps the Deck Builder from displaying
// Ice/Magnetic/Black Flame (held back for the alpha) the way FocusSim's
// own client does via its build-time VITE_RELEASED_ELEMENTS — except this
// stays live-synced instead of needing a rebuild if a release date moves.
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthContext";

export function useReleasedElements() {
  const { user } = useAuth();
  const [released, setReleased] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setReleased(new Set()); setLoading(false); return; }
    let cancelled = false;
    setLoading(true);

    supabase
      .from("element_releases")
      .select("element, released")
      .eq("released", true)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) { setLoading(false); return; }
        setReleased(new Set((data || []).map((row) => row.element)));
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [user]);

  return { released, loading };
}
