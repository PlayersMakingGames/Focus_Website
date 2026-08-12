import { Suspense } from "react";
import DeckBuilderView from "@/components/DeckBuilderView";

export const metadata = {
  title: "Deck Builder — Focus",
  description: "Build a legal Focus deck from the full card pool.",
};

export default function DeckBuilder() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Deck Builder</h1>
      <p className="mt-2 text-sm text-white/60">
        Pick a Leader, build a legal 36-card deck, and save it to your Focus
        account — the same deck shows up in Focus Online.
      </p>
      <Suspense fallback={<p className="mt-8 text-sm text-white/50">Loading…</p>}>
        <DeckBuilderView />
      </Suspense>
    </div>
  );
}
