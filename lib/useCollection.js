"use client";

// public.collection: how many copies of each card the signed-in account
// owns. Used only for the Deck Builder's "Owned" filter — not enforced as a
// save-blocking rule, matching FocusSim's own player_decks (ownership is
// checked at ranked-queue time, not deck-save time).
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthContext";

export function useCollection() {
  const { user } = useAuth();
  const [owned, setOwned] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setOwned({}); setLoading(false); return; }
    let cancelled = false;
    setLoading(true);

    supabase
      .from("collection")
      .select("card_id, quantity")
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) { setLoading(false); return; }
        const map = {};
        for (const row of data || []) map[row.card_id] = row.quantity;
        setOwned(map);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [user]);

  return { owned, loading };
}
