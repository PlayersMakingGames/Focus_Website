"use client";

import Link from "next/link";
import { deckCount, deckIsLegal, NON_LEADER_DECK_SIZE } from "@/lib/cardRules";

export default function DeckCard({ name, deck, cardsById, onDelete }) {
  const leaderCard = deck.leader ? cardsById[deck.leader] : null;
  const legal = deckIsLegal(cardsById, deck);
  const total = deckCount(deck.counts || {});

  return (
    <div className="hud-cut border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-white">{name}</h3>
        <span className={`shrink-0 text-xs font-semibold ${legal ? "text-cyan-300" : "text-red-400"}`}>
          {legal ? "✓ LEGAL" : "✗ INVALID"}
        </span>
      </div>
      <p className="mt-1 text-sm text-white/50">
        {leaderCard ? `${leaderCard.name} · ${leaderCard.element}` : "No Leader set"}
      </p>
      <p className="mt-1 text-xs text-white/40">{total} / {NON_LEADER_DECK_SIZE} cards</p>

      <div className="mt-4 flex gap-4 text-sm">
        <Link href={`/decks/builder?edit=${encodeURIComponent(name)}`} className="text-cyan-300 hover:underline">
          Edit
        </Link>
        <button type="button" onClick={() => onDelete(name)} className="text-white/40 hover:text-red-400">
          Delete
        </button>
      </div>
    </div>
  );
}
