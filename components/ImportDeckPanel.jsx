"use client";

import { useState } from "react";
import { decodeDeck } from "@/lib/deckCode";

export default function ImportDeckPanel({ cardsById, onImport }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleImport() {
    const { deck, error: err } = decodeDeck(code, cardsById);
    if (err) { setError(err); return; }
    onImport(deck);
    setCode("");
    setError("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-cyan-300 hover:underline"
      >
        Import Deck
      </button>
    );
  }

  return (
    <div className="hud-cut-sm flex flex-col gap-2 border border-white/10 bg-white/[0.03] p-3 sm:flex-row sm:items-center">
      <input
        type="text"
        value={code}
        onChange={(e) => { setCode(e.target.value); setError(""); }}
        placeholder="Paste a deck code (FD1-…)"
        className="flex-1 rounded border border-white/15 bg-black/40 px-3 py-1.5 text-sm text-white outline-none focus:border-cyan-400/50"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleImport}
          className="hud-cut-sm bg-cyan-400 px-3 py-1.5 text-xs font-semibold text-black hover:bg-cyan-300"
        >
          Import
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setCode(""); setError(""); }}
          className="px-3 py-1.5 text-xs text-white/50 hover:text-white"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-xs text-red-400 sm:basis-full">{error}</p>}
    </div>
  );
}
