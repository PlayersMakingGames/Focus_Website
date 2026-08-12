"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { useCardCatalog } from "@/lib/useCardCatalog";
import { fetchCommunityDecks, fetchAuthorNames } from "@/lib/useSharedDecks";
import { deckIsLegal } from "@/lib/cardRules";

export default function CommunityDecksView() {
  const { user, loading: authLoading } = useAuth();
  const { cardsById, loading: catalogLoading } = useCardCatalog();
  const [decks, setDecks] = useState(null);
  const [authors, setAuthors] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    fetchCommunityDecks().then(async ({ decks: rows, error: err }) => {
      if (cancelled) return;
      if (err) { setError(err); return; }
      setDecks(rows);
      const names = await fetchAuthorNames(rows.map((d) => d.user_id));
      if (!cancelled) setAuthors(names);
    });
    return () => { cancelled = true; };
  }, [user]);

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="hud-cut mt-8 max-w-md border border-white/10 bg-white/[0.03] p-6">
        <p className="text-white/70">Sign in to browse Community Decks.</p>
        <Link href="/account" className="mt-4 inline-block text-sm text-cyan-300 hover:underline">
          Go to Account →
        </Link>
      </div>
    );
  }

  if (catalogLoading || decks === null) {
    return <p className="mt-8 text-sm text-white/50">Loading…</p>;
  }

  if (error) {
    return <p className="mt-8 text-sm text-red-400">Couldn&rsquo;t load Community Decks: {error}</p>;
  }

  if (decks.length === 0) {
    return (
      <div className="hud-cut mt-8 max-w-md border border-white/10 bg-white/[0.03] p-6">
        <p className="text-white/70">No decks published yet — be the first.</p>
        <Link href="/decks/mine" className="mt-4 inline-block text-sm text-cyan-300 hover:underline">
          Go to My Decks →
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {decks.map((d) => {
        const leaderCard = cardsById[d.leader];
        const legal = deckIsLegal(cardsById, { leader: d.leader, counts: d.counts });
        return (
          <Link
            key={d.id}
            href={`/decks/community/${d.id}`}
            className="hud-cut border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-cyan-400/30"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-white">{d.name}</h3>
              <span className={`shrink-0 text-xs font-semibold ${legal ? "text-cyan-300" : "text-red-400"}`}>
                {legal ? "✓ LEGAL" : "✗ INVALID"}
              </span>
            </div>
            <p className="mt-1 text-sm text-white/50">
              {leaderCard ? `${leaderCard.name} · ${leaderCard.element}` : d.leader}
            </p>
            <p className="mt-3 text-xs text-white/40">
              by {authors[d.user_id] || "Anonymous"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
