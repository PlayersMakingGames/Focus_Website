"use client";

// public.cards is RLS-locked `to authenticated` (see the Pass 2 plan), so
// this only fetches once a session exists — signed-out callers get
// cardsById: {} rather than an error, since "not logged in" isn't a fetch
// failure.
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthContext";

export function useCardCatalog() {
  const { user } = useAuth();
  const [cardsById, setCardsById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) { setCardsById({}); setLoading(false); return; }
    let cancelled = false;
    setLoading(true);

    supabase
      .from("cards")
      .select("id, base_card_id, name, type, element, elements, skill_type, max_copies, text, surge_text, is_trigger, is_skill_link")
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) { setError(err.message); setLoading(false); return; }
        const byId = {};
        for (const card of data || []) byId[card.id] = card;
        setCardsById(byId);
        setError(null);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [user]);

  return { cardsById, loading, error };
}
