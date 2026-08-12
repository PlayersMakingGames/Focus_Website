"use client";

import { useState } from "react";
import Link from "next/link";
import { deckCount, deckIsLegal, NON_LEADER_DECK_SIZE } from "@/lib/cardRules";

export default function DeckCard({ name, deck, cardsById, onDelete, publishedId, onPublish, onUnpublish }) {
  const leaderCard = deck.leader ? cardsById[deck.leader] : null;
  const legal = deckIsLegal(cardsById, deck);
  const total = deckCount(deck.counts || {});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function handlePublish() {
    setBusy(true);
    const { error } = await onPublish(name, deck);
    setBusy(false);
    setMessage(error ? `Couldn't publish: ${error}` : "Published.");
  }

  async function handleUnpublish() {
    if (!window.confirm(`Unpublish "${name}"? Its Community Decks link will stop working for anyone who has it.`)) return;
    setBusy(true);
    await onUnpublish(name);
    setBusy(false);
    setMessage("");
  }

  function handleDelete() {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    onDelete(name);
  }

  async function handleCopyLink() {
    // basePath is "/focus" (next.config.mjs) — next/link resolves it
    // automatically, but a raw copyable URL has to be built by hand.
    const url = `${window.location.origin}/focus/decks/community/${publishedId}`;
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied.");
    } catch {
      setMessage(url);
    }
    setTimeout(() => setMessage(""), 3000);
  }

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

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link href={`/decks/builder?edit=${encodeURIComponent(name)}`} className="text-cyan-300 hover:underline">
          Edit
        </Link>
        {publishedId ? (
          <>
            <button type="button" onClick={handleCopyLink} className="text-cyan-300 hover:underline">
              Copy Link
            </button>
            <button type="button" disabled={busy} onClick={handleUnpublish} className="text-white/40 hover:text-red-400 disabled:opacity-50">
              Unpublish
            </button>
          </>
        ) : (
          <button type="button" disabled={busy} onClick={handlePublish} className="text-cyan-300 hover:underline disabled:opacity-50">
            {busy ? "Publishing…" : "Publish"}
          </button>
        )}
        <button type="button" onClick={handleDelete} className="text-white/40 hover:text-red-400">
          Delete
        </button>
      </div>
      {message && <p className="mt-2 break-all text-xs text-white/50">{message}</p>}
    </div>
  );
}
