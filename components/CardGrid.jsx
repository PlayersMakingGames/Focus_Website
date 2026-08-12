"use client";

import CardTile from "@/components/CardTile";

export default function CardGrid({ cards, counts, leaderCard, isLegalFor, onAdd, onRemove }) {
  if (cards.length === 0) {
    return <p className="mt-10 text-sm text-white/40">No cards match these filters.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
      {cards.map((card) => {
        const count = counts[card.id] || 0;
        let disabledReason = null;
        if (!leaderCard) disabledReason = "Pick a Leader first";
        else if (!isLegalFor(card, leaderCard)) disabledReason = "Doesn't match this Leader's Elements";
        else if (count >= card.max_copies) disabledReason = `Limit ${card.max_copies} reached`;

        return (
          <CardTile
            key={card.id}
            card={card}
            count={count}
            disabledReason={disabledReason}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}
