"use client";

// public.player_decks — the same table FocusSim's own Deck Library reads
// and writes (schema.sql:141-164, plain client insert/update under RLS, no
// RPC). A deck saved here from the website *is* the deck that shows up in
// Focus Online for this account; there's no separate sync step. The
// 15-deck cap and profanity check on names are enforced by triggers
// server-side (enforce_deck_limit / supabase/profanity.sql) — save() just
// surfaces whatever error a rejected upsert returns rather than
// re-implementing either check.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthContext";

export function usePlayerDecks() {
  const { user } = useAuth();
  const [decks, setDecks] = useState({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) { setDecks({}); setLoading(false); return {}; }
    setLoading(true);
    const { data } = await supabase
      .from("player_decks")
      .select("decks")
      .eq("user_id", user.id)
      .maybeSingle();
    const current = data?.decks || {};
    setDecks(current);
    setLoading(false);
    return current;
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  // Re-reads before merging rather than trusting local state, so a stale
  // page (e.g. a deck saved from FocusSim itself in the meantime) can't get
  // clobbered by an upsert built from an out-of-date snapshot.
  const saveDeck = useCallback(async (name, deck) => {
    if (!user) return { error: "You need to be signed in to save a deck." };
    const current = await refresh();
    const next = { ...current, [name]: deck };
    const { error } = await supabase
      .from("player_decks")
      .upsert({ user_id: user.id, decks: next, updated_at: new Date().toISOString() });
    if (error) return { error: error.message };
    setDecks(next);
    return { error: null };
  }, [user, refresh]);

  const deleteDeck = useCallback(async (name) => {
    if (!user) return { error: "You need to be signed in." };
    const current = await refresh();
    const next = { ...current };
    delete next[name];
    const { error } = await supabase
      .from("player_decks")
      .upsert({ user_id: user.id, decks: next, updated_at: new Date().toISOString() });
    if (error) return { error: error.message };
    setDecks(next);
    return { error: null };
  }, [user, refresh]);

  return { decks, loading, saveDeck, deleteDeck, refresh };
}
