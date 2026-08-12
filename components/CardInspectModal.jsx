"use client";

import { useEffect, useState } from "react";
import { cardImageUrl } from "@/lib/cardImage";
import { keywordHints } from "@/lib/cardKeywords";

// Mirrors FocusSim's own CardArtViewer (src/CardArtViewer.jsx) for the art
// zoom, plus CardInspectOverlay (src/App.jsx) for the rules text and
// keyword call-outs below it — click a card, see the art as big as the
// screen allows, read what it does, click anywhere or Escape to close.
const CARD_ASPECT = 750 / 1050;

// Same color language as FocusSim's KEYWORD_HINT_STYLES (App.jsx:10527+):
// Surge amber, Skill Link cyan, Unveil blue, Trigger red — a player who's
// played the game recognizes these on sight.
const KEYWORD_STYLES = {
  surge: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  skillLink: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
  unveil: "border-blue-400/40 bg-blue-400/10 text-blue-300",
  trigger: "border-red-400/40 bg-red-400/10 text-red-300",
};

function fitWidth() {
  if (typeof window === "undefined") return 420;
  const byHeight = window.innerHeight * 0.8 * CARD_ASPECT;
  const byWidth = window.innerWidth * 0.85;
  return Math.max(240, Math.round(Math.min(byHeight, byWidth)));
}

export default function CardInspectModal({ card, onClose }) {
  const [width, setWidth] = useState(fitWidth);

  useEffect(() => {
    const onResize = () => setWidth(fitWidth());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!card) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, onClose]);

  if (!card) return null;

  const hints = keywordHints(card);
  const textLines = card.text ? card.text.split("\n") : [];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] flex cursor-zoom-out flex-col items-center justify-center gap-4 overflow-y-auto bg-black/88 py-10 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed right-5 top-5 rounded border border-white/20 bg-black/40 px-2.5 py-1.5 text-sm text-white/60 hover:text-white"
      >
        ✕
      </button>

      <img
        src={cardImageUrl(card.id)}
        alt={card.name}
        onClick={(e) => e.stopPropagation()}
        style={{ width, cursor: "default" }}
        className="rounded-xl shadow-2xl shadow-black/60"
      />

      <div className="text-center">
        <div className="text-sm font-bold text-white">{card.name}</div>
      </div>

      {(hints.length > 0 || textLines.some(Boolean) || card.surge_text) && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md cursor-default space-y-2 px-4"
        >
          {hints.map((hint) => (
            <div
              key={hint.key}
              className={`rounded-lg border px-3 py-2 text-xs leading-snug ${KEYWORD_STYLES[hint.key]}`}
            >
              {hint.text}
            </div>
          ))}
          {textLines.filter(Boolean).map((line, i) => (
            <p
              key={i}
              className={`text-center text-sm leading-relaxed ${line.trim().startsWith("Surge —") ? "text-amber-300/90" : "text-white/80"}`}
            >
              {line}
            </p>
          ))}
          {card.surge_text && (
            <p className="text-center text-sm leading-relaxed text-amber-300/90">
              {card.surge_text}
            </p>
          )}
        </div>
      )}

      <div className="pointer-events-none text-center text-[10px] uppercase tracking-widest text-white/30">
        Click anywhere to close
      </div>
    </div>
  );
}
