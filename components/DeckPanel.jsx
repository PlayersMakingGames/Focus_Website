"use client";

import { useState } from "react";
import { deckCount, NON_LEADER_DECK_SIZE, GROUP_LABELS, groupCounts } from "@/lib/cardRules";
import { encodeDeck } from "@/lib/deckCode";
import DeckValidation from "@/components/DeckValidation";

export default function DeckPanel({
  cardsById, leaderCard, onChangeLeader, counts, onRemove,
  issues, deckName, setDeckName, onSave, saving, saveMessage,
}) {
  const groups = groupCounts(cardsById, counts);
  const total = deckCount(counts);
  const [copyMessage, setCopyMessage] = useState("");

  async function handleCopyCode() {
    try {
      const code = encodeDeck({ leader: leaderCard.id, counts });
      await navigator.clipboard.writeText(code);
      setCopyMessage("Copied!");
    } catch {
      setCopyMessage("Couldn't copy. Select and copy manually.");
    }
    setTimeout(() => setCopyMessage(""), 2500);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wide text-white/40">Leader</div>
          {leaderCard && (
            <button type="button" onClick={handleCopyCode} className="text-xs text-cyan-300 hover:underline">
              {copyMessage || "Copy Code"}
            </button>
          )}
        </div>
        {leaderCard ? (
          <div className="mt-2 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div>
              <div className="text-sm font-semibold">{leaderCard.name}</div>
              <div className="text-xs text-white/50">{leaderCard.element}</div>
            </div>
            <button type="button" onClick={onChangeLeader} className="text-xs text-cyan-300 hover:underline">
              Change
            </button>
          </div>
        ) : (
          <p className="mt-2 text-sm text-white/50">Pick a Leader below to start building.</p>
        )}
      </div>

      <div>
        <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-wide text-white/40">
          <span>Deck</span>
          <span>{total} / {NON_LEADER_DECK_SIZE}</span>
        </div>
        <div className="mt-2 max-h-80 space-y-4 overflow-y-auto pr-1">
          {Object.entries(groups).map(([type, entries]) => entries.length > 0 && (
            <div key={type}>
              <div className="text-xs font-medium text-white/40">{GROUP_LABELS[type]}</div>
              <ul className="mt-1 space-y-1">
                {entries.map(({ card, n }) => (
                  <li key={card.id} className="flex items-center justify-between text-sm">
                    <span className="truncate text-white/80">{card.name}</span>
                    <span className="ml-2 flex shrink-0 items-center gap-2">
                      <span className="text-white/50">×{n}</span>
                      <button
                        type="button"
                        onClick={() => onRemove(card)}
                        className="text-xs text-white/30 hover:text-red-400"
                      >
                        remove
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {total === 0 && <p className="text-sm text-white/40">No cards added yet.</p>}
        </div>
      </div>

      <DeckValidation issues={issues} />

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-white/40">Deck Name</label>
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Name this deck…"
          className="mt-1.5 w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
        />
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={saving || !deckName.trim()}
        className="hud-cut-sm bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Deck"}
      </button>
      {saveMessage && <p className="text-xs text-white/60">{saveMessage}</p>}
    </div>
  );
}
