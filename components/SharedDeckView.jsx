"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { useCardCatalog } from "@/lib/useCardCatalog";
import { usePlayerDecks } from "@/lib/usePlayerDecks";
import { fetchSharedDeck, fetchAuthorNames } from "@/lib/useSharedDecks";
import { deckCount, deckIsLegal, legalityIssues, groupCounts, GROUP_LABELS, NON_LEADER_DECK_SIZE } from "@/lib/cardRules";
import { encodeDeck } from "@/lib/deckCode";
import DeckValidation from "@/components/DeckValidation";

export default function SharedDeckView({ id }) {
  const { user, loading: authLoading } = useAuth();
  const { cardsById, loading: catalogLoading } = useCardCatalog();
  const { saveDeck } = usePlayerDecks();
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    fetchSharedDeck(id).then(async ({ deck: row, error: err }) => {
      if (cancelled) return;
      if (err) { setError(err); return; }
      setDeck(row);
      const names = await fetchAuthorNames([row.user_id]);
      if (!cancelled) setAuthorName(names[row.user_id] || "Anonymous");
    });
    return () => { cancelled = true; };
  }, [id, user]);

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="hud-cut mt-8 max-w-md border border-white/10 bg-white/[0.03] p-6">
        <p className="text-white/70">Sign in to view this deck.</p>
        <Link href="/account" className="mt-4 inline-block text-sm text-cyan-300 hover:underline">
          Go to Account →
        </Link>
      </div>
    );
  }

  if (catalogLoading || (!deck && !error)) {
    return <p className="mt-8 text-sm text-white/50">Loading…</p>;
  }

  if (error) {
    return <p className="mt-8 text-sm text-red-400">{error}</p>;
  }

  const leaderCard = cardsById[deck.leader];
  const legal = deckIsLegal(cardsById, deck);
  const issues = legalityIssues(cardsById, deck);
  const groups = groupCounts(cardsById, deck.counts);
  const total = deckCount(deck.counts);

  async function handleCopyCode() {
    try {
      const code = encodeDeck({ leader: deck.leader, counts: deck.counts });
      await navigator.clipboard.writeText(code);
      setMessage("Code copied.");
    } catch {
      setMessage("Couldn't copy — try again.");
    }
    setTimeout(() => setMessage(""), 2500);
  }

  async function handleImport() {
    setImporting(true);
    const targetName = `${deck.name} (from ${authorName})`;
    const { error: err } = await saveDeck(targetName, { leader: deck.leader, counts: deck.counts });
    setImporting(false);
    setMessage(err ? `Couldn't import: ${err}` : `Saved to My Decks as "${targetName}".`);
  }

  return (
    <div className="mt-8 max-w-2xl">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-2xl font-bold text-white">{deck.name}</h2>
        <span className={`shrink-0 text-sm font-semibold ${legal ? "text-cyan-300" : "text-red-400"}`}>
          {legal ? "✓ LEGAL" : "✗ INVALID"}
        </span>
      </div>
      <p className="mt-1 text-sm text-white/50">
        by {authorName} · {leaderCard ? `${leaderCard.name} · ${leaderCard.element}` : deck.leader}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopyCode}
          className="hud-cut-sm border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-white/40"
        >
          Copy Deck Code
        </button>
        <button
          type="button"
          disabled={importing}
          onClick={handleImport}
          className="hud-cut-sm bg-cyan-400 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-300 disabled:opacity-50"
        >
          {importing ? "Importing…" : "Import to My Decks"}
        </button>
        <Link
          href={`/decks/builder?from=${id}`}
          className="hud-cut-sm border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-white/40"
        >
          Open in Deck Builder
        </Link>
      </div>
      {message && <p className="mt-2 text-xs text-white/60">{message}</p>}

      <div className="mt-8">
        <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-wide text-white/40">
          <span>Deck</span>
          <span>{total} / {NON_LEADER_DECK_SIZE}</span>
        </div>
        <div className="mt-2 space-y-4">
          {Object.entries(groups).map(([type, entries]) => entries.length > 0 && (
            <div key={type}>
              <div className="text-xs font-medium text-white/40">{GROUP_LABELS[type]}</div>
              <ul className="mt-1 space-y-1">
                {entries.map(({ card, n }) => (
                  <li key={card.id} className="flex items-center justify-between text-sm">
                    <span className="text-white/80">{card.name}</span>
                    <span className="text-white/50">×{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <DeckValidation issues={issues} />
      </div>
    </div>
  );
}
