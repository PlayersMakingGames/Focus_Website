"use client";

import { useEffect, useState } from "react";
import { cardImageUrl } from "@/lib/cardImage";

// Mirrors FocusSim's own CardArtViewer (src/CardArtViewer.jsx) — click a
// card, see the art as big as the screen allows, click anywhere or Escape
// to close. No rules text or foil/tilt rendering (public.cards doesn't
// carry ability text, and foil finishes aren't tracked on this site) — the
// card image itself already has everything printed on it baked in.
const CARD_ASPECT = 750 / 1050;

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

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-black/88 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 rounded border border-white/20 bg-black/40 px-2.5 py-1.5 text-sm text-white/60 hover:text-white"
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

      <div className="pointer-events-none text-center">
        <div className="text-sm font-bold text-white">{card.name}</div>
        <div className="mt-1 text-[10px] uppercase tracking-widest text-white/30">
          Click anywhere to close
        </div>
      </div>
    </div>
  );
}
