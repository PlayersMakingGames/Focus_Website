"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { useCardCatalog } from "@/lib/useCardCatalog";
import { usePlayerDecks } from "@/lib/usePlayerDecks";
import DeckCard from "@/components/DeckCard";

export default function MyDecksView() {
  const { user, loading: authLoading } = useAuth();
  const { cardsById, loading: catalogLoading } = useCardCatalog();
  const { decks, loading: decksLoading, deleteDeck } = usePlayerDecks();

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="hud-cut mt-8 max-w-md border border-white/10 bg-white/[0.03] p-6">
        <p className="text-white/70">Sign in to see your saved decks.</p>
        <Link href="/account" className="mt-4 inline-block text-sm text-cyan-300 hover:underline">
          Go to Account →
        </Link>
      </div>
    );
  }

  if (catalogLoading || decksLoading) {
    return <p className="mt-8 text-sm text-white/50">Loading your decks…</p>;
  }

  const entries = Object.entries(decks);

  if (entries.length === 0) {
    return (
      <div className="hud-cut mt-8 max-w-md border border-white/10 bg-white/[0.03] p-6">
        <p className="text-white/70">No saved decks yet.</p>
        <Link href="/decks/builder" className="mt-4 inline-block text-sm text-cyan-300 hover:underline">
          Open the Deck Builder →
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(([name, deck]) => (
        <DeckCard key={name} name={name} deck={deck} cardsById={cardsById} onDelete={deleteDeck} />
      ))}
    </div>
  );
}
