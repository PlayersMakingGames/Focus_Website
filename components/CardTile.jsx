"use client";

import { cardImageUrl } from "@/lib/cardImage";
import { costOf } from "@/lib/cardCosts";

// A single card in the grid. `disabledReason`, when set, greys the tile out
// and blocks adding (off-element for the chosen Leader, at its copy limit,
// or no Leader picked yet) — shown, not hidden, so a player can see why a
// card isn't available rather than wondering where it went.
//
// mode="display" (Collection) has no +/- steppers — clicking it inspects
// the card instead (see CardInspectModal), same as FocusSim's own
// click-to-enlarge. An unowned card renders grayscale/dim rather than at
// full color, same "shown, not hidden" logic as disabledReason.
export default function CardTile({ card, count = 0, disabledReason, onAdd, onRemove, onInspect, mode = "add" }) {
  const cost = costOf(card.id);
  const unowned = mode === "display" && count === 0;

  return (
    <div className={`relative ${disabledReason ? "opacity-40" : ""} ${unowned ? "opacity-35 grayscale" : ""}`}>
      <button
        type="button"
        disabled={mode === "display" ? false : !!disabledReason}
        onClick={() => (mode === "display" ? onInspect?.(card) : onAdd?.(card))}
        title={mode === "display" ? `${card.name} — click to enlarge` : disabledReason || card.name}
        className={`block w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:border-cyan-400/40 disabled:cursor-default disabled:hover:border-white/10 ${mode === "display" ? "cursor-zoom-in" : ""}`}
      >
        <img
          src={cardImageUrl(card.id)}
          alt={card.name}
          loading="lazy"
          className="aspect-[5/7] w-full object-cover"
        />
      </button>

      {mode === "add" && count > 0 && (
        <div className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded-full bg-black/80 px-1.5 py-0.5">
          <button
            type="button"
            onClick={() => onRemove?.(card)}
            className="h-4 w-4 text-xs leading-none text-white/70 hover:text-white"
          >
            −
          </button>
          <span className="text-xs font-semibold text-cyan-300">{count}</span>
          <button
            type="button"
            disabled={!!disabledReason}
            onClick={() => onAdd?.(card)}
            className="h-4 w-4 text-xs leading-none text-white/70 hover:text-white disabled:opacity-30"
          >
            +
          </button>
        </div>
      )}

      {mode === "display" && (
        <span className={`absolute right-1.5 top-1.5 rounded-full bg-black/80 px-1.5 py-0.5 text-xs font-semibold ${count > 0 ? "text-cyan-300" : "text-white/40"}`}>
          {count > 0 ? `×${count}` : "—"}
        </span>
      )}

      {cost !== null && (
        <span className="absolute left-1.5 top-1.5 rounded-full bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-300">
          {cost}
        </span>
      )}
    </div>
  );
}
