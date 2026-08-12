"use client";

// public.shared_decks — publicly readable (no login needed to browse or
// view a shared link), but the ONLY way to write it is the
// publish_shared_deck RPC (community-decks.sql), which validates release
// status server-side. This hook never inserts/updates the table directly
// — it calls the RPC and lets its error surface, the same way saveDeck
// surfaces player_decks upsert errors.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthContext";

export function useSharedDecks() {
  const { user } = useAuth();
  const [myPublished, setMyPublished] = useState({}); // { [name]: id }
  const [loading, setLoading] = useState(true);

  const refreshMine = useCallback(async () => {
    if (!user) { setMyPublished({}); setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from("shared_decks")
      .select("id, name")
      .eq("user_id", user.id);
    const map = {};
    for (const row of data || []) map[row.name] = row.id;
    setMyPublished(map);
    setLoading(false);
  }, [user]);

  useEffect(() => { refreshMine(); }, [refreshMine]);

  const publish = useCallback(async (name, deck) => {
    if (!user) return { error: "You need to be signed in to publish a deck." };
    const { error } = await supabase.rpc("publish_shared_deck", {
      p_name: name,
      p_leader: deck.leader,
      p_counts: deck.counts,
    });
    if (error) return { error: error.message };
    await refreshMine();
    return { error: null };
  }, [user, refreshMine]);

  const unpublish = useCallback(async (name) => {
    if (!user) return { error: "You need to be signed in." };
    const { error } = await supabase
      .from("shared_decks")
      .delete()
      .eq("user_id", user.id)
      .eq("name", name);
    if (error) return { error: error.message };
    await refreshMine();
    return { error: null };
  }, [user, refreshMine]);

  return { myPublished, loading, publish, unpublish, refreshMine };
}

// Public browse list — no auth required by RLS, but the card names/art
// still need public.cards, which IS auth-gated, so callers of this still
// end up behind the same sign-in wall as the rest of the Deck Builder.
export async function fetchCommunityDecks(limit = 50) {
  const { data, error } = await supabase
    .from("shared_decks")
    .select("id, user_id, name, leader, counts, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return { decks: [], error: error.message };
  return { decks: data || [], error: null };
}

export async function fetchSharedDeck(id) {
  const { data, error } = await supabase
    .from("shared_decks")
    .select("id, user_id, name, leader, counts, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error) return { deck: null, error: error.message };
  if (!data) return { deck: null, error: "That deck doesn't exist or was unpublished." };
  return { deck: data, error: null };
}

export async function fetchAuthorNames(userIds) {
  const unique = [...new Set(userIds)];
  if (unique.length === 0) return {};
  const { data } = await supabase.from("profiles").select("id, username").in("id", unique);
  const map = {};
  for (const row of data || []) map[row.id] = row.username;
  return map;
}
