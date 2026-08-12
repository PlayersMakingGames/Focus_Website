"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useCardCatalog } from "@/lib/useCardCatalog";
import { useCollection } from "@/lib/useCollection";
import { useReleasedElements } from "@/lib/useReleasedElements";
import { ELEMENTS } from "@/lib/elements";
import CardTile from "@/components/CardTile";
import CardInspectModal from "@/components/CardInspectModal";

export default function CollectionView() {
  const { user, loading: authLoading } = useAuth();
  const { cardsById, loading: catalogLoading } = useCardCatalog();
  const { owned, loading: ownedLoading } = useCollection();
  const { released: releasedElements, loading: releasedLoading } = useReleasedElements();
  const [inspecting, setInspecting] = useState(null);

  // Grouped by Element, released only — an unreleased card showing up here
  // (even just as a name/art, with or without ownership) is exactly the
  // content leak the rest of this site already guards against.
  const byElement = useMemo(() => {
    const groups = {};
    for (const card of Object.values(cardsById)) {
      if (!releasedElements.has(card.element)) continue;
      (groups[card.element] ||= []).push(card);
    }
    for (const list of Object.values(groups)) {
      list.sort((a, b) => (a.type === "leader" ? -1 : b.type === "leader" ? 1 : 0) || a.name.localeCompare(b.name));
    }
    return groups;
  }, [cardsById, releasedElements]);

  const totalReleased = Object.values(byElement).reduce((sum, list) => sum + list.length, 0);
  const totalOwned = Object.values(byElement)
    .flat()
    .filter((c) => (owned[c.id] || 0) > 0).length;

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="hud-cut mt-8 max-w-md border border-white/10 bg-white/[0.03] p-6">
        <p className="text-white/70">Sign in to see your Digital Collection.</p>
        <Link href="/account" className="mt-4 inline-block text-sm text-cyan-300 hover:underline">
          Go to Account →
        </Link>
      </div>
    );
  }

  const loading = catalogLoading || ownedLoading || releasedLoading;

  return (
    <div className="mt-8">
      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-white">Digital Collection</h2>
          {!loading && (
            <span className="text-sm font-semibold text-cyan-300">
              {totalOwned} / {totalReleased} owned
            </span>
          )}
        </div>

        {loading ? (
          <p className="mt-6 text-sm text-white/50">Loading…</p>
        ) : (
          <div className="mt-6 space-y-8">
            {ELEMENTS.filter((el) => releasedElements.has(el.key)).map((el) => {
              const cards = byElement[el.key] || [];
              const ownedCount = cards.filter((c) => (owned[c.id] || 0) > 0).length;
              return (
                <div key={el.key}>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: el.color }} />
                    <h3 className="text-sm font-semibold text-white/80">{el.label}</h3>
                    <span className="text-xs text-white/40">{ownedCount} / {cards.length}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
                    {cards.map((card) => (
                      <CardTile
                        key={card.id}
                        card={card}
                        count={owned[card.id] || 0}
                        mode="display"
                        onInspect={setInspecting}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-14 border-t border-white/10 pt-10">
        <h2 className="text-xl font-bold text-white">Physical Collection</h2>
        <div className="hud-cut mt-4 max-w-xl border border-white/10 bg-white/[0.02] p-6">
          <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/50">
            COMING SOON
          </span>
          <p className="mt-4 text-sm text-white/60">
            Once Paper Focus exists as a real, sellable product, this is
            where physical cards registered to your account will show up.
            There&rsquo;s no physical ownership tracking of any kind yet, so
            this stays empty rather than showing placeholder data.
          </p>
        </div>
      </section>

      <CardInspectModal card={inspecting} onClose={() => setInspecting(null)} />
    </div>
  );
}
