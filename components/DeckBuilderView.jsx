"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useCardCatalog } from "@/lib/useCardCatalog";
import { useCollection } from "@/lib/useCollection";
import { usePlayerDecks } from "@/lib/usePlayerDecks";
import { cardElements, cardLegalForLeader, legalityIssues } from "@/lib/cardRules";
import { costOf } from "@/lib/cardCosts";
import CardFilters from "@/components/CardFilters";
import CardGrid from "@/components/CardGrid";
import CardTile from "@/components/CardTile";
import DeckPanel from "@/components/DeckPanel";

function matchesCost(cardId, costsSet) {
  if (costsSet.size === 0) return true;
  const cost = costOf(cardId);
  if (cost === null) return false;
  for (const c of costsSet) {
    if (c === 5 && cost >= 5) return true;
    if (c === cost) return true;
  }
  return false;
}

export default function DeckBuilderView() {
  const { user, loading: authLoading } = useAuth();
  const { cardsById, loading: catalogLoading, error: catalogError } = useCardCatalog();
  const { owned } = useCollection();
  const { decks, saveDeck } = usePlayerDecks();
  const searchParams = useSearchParams();
  const editName = searchParams.get("edit");

  const [leader, setLeader] = useState(null);
  const [counts, setCounts] = useState({});
  const [deckName, setDeckName] = useState("");
  const [filters, setFilters] = useState({
    elements: new Set(), types: new Set(), costs: new Set(), search: "", ownedOnly: false,
  });
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const loadedEditRef = useRef(null);
  useEffect(() => {
    if (!editName || loadedEditRef.current === editName) return;
    const existing = decks[editName];
    if (!existing) return;
    setLeader(existing.leader || null);
    setCounts(existing.counts || {});
    setDeckName(editName);
    loadedEditRef.current = editName;
  }, [editName, decks]);

  const leaderCard = leader ? cardsById[leader] : null;
  const leaders = useMemo(
    () => Object.values(cardsById).filter((c) => c.type === "leader").sort((a, b) => a.name.localeCompare(b.name)),
    [cardsById]
  );

  const filteredCards = useMemo(() => {
    return Object.values(cardsById)
      .filter((c) => c.type !== "leader")
      .filter((c) => filters.elements.size === 0 || cardElements(c).some((el) => filters.elements.has(el)))
      .filter((c) => filters.types.size === 0 || filters.types.has(c.type))
      .filter((c) => matchesCost(c.id, filters.costs))
      .filter((c) => !filters.search || c.name.toLowerCase().includes(filters.search.toLowerCase()))
      .filter((c) => !filters.ownedOnly || (owned[c.id] || 0) > 0)
      .sort((a, b) => (costOf(a.id) ?? 0) - (costOf(b.id) ?? 0) || a.name.localeCompare(b.name));
  }, [cardsById, filters, owned]);

  function addCard(card) {
    setCounts((prev) => ({ ...prev, [card.id]: (prev[card.id] || 0) + 1 }));
    setSaveMessage("");
  }
  function removeCard(card) {
    setCounts((prev) => {
      const next = { ...prev };
      if (!next[card.id]) return prev;
      next[card.id] -= 1;
      if (next[card.id] <= 0) delete next[card.id];
      return next;
    });
    setSaveMessage("");
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await saveDeck(deckName.trim(), { leader, counts });
    setSaving(false);
    setSaveMessage(error ? `Couldn't save: ${error}` : "Saved.");
  }

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="hud-cut mt-8 max-w-md border border-white/10 bg-white/[0.03] p-6">
        <p className="text-white/70">Sign in to build and save a deck.</p>
        <Link href="/account" className="mt-4 inline-block text-sm text-cyan-300 hover:underline">
          Go to Account →
        </Link>
      </div>
    );
  }

  if (catalogError) {
    return <p className="mt-8 text-sm text-red-400">Couldn&rsquo;t load the card catalog: {catalogError}</p>;
  }

  if (catalogLoading) {
    return <p className="mt-8 text-sm text-white/50">Loading the card catalog…</p>;
  }

  const issues = legalityIssues(cardsById, { leader, counts });

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr_320px]">
      <aside>
        <CardFilters filters={filters} setFilters={setFilters} hasCollection={Object.keys(owned).length > 0} />
      </aside>

      <div>
        {!leaderCard ? (
          <div>
            <div className="text-sm font-semibold text-white/70">Pick your Leader</div>
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {leaders.map((card) => (
                <CardTile key={card.id} card={card} mode="pick" onAdd={() => setLeader(card.id)} />
              ))}
            </div>
          </div>
        ) : (
          <CardGrid
            cards={filteredCards}
            counts={counts}
            leaderCard={leaderCard}
            isLegalFor={cardLegalForLeader}
            onAdd={addCard}
            onRemove={removeCard}
          />
        )}
      </div>

      <aside>
        <DeckPanel
          cardsById={cardsById}
          leaderCard={leaderCard}
          onChangeLeader={() => setLeader(null)}
          counts={counts}
          onRemove={removeCard}
          issues={issues}
          deckName={deckName}
          setDeckName={setDeckName}
          onSave={handleSave}
          saving={saving}
          saveMessage={saveMessage}
        />
      </aside>
    </div>
  );
}
