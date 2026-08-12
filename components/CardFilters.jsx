"use client";

import { ELEMENTS } from "@/lib/elements";

const TYPES = ["unit", "skill", "rally"];
const COSTS = [0, 1, 2, 3, 4, 5];

export default function CardFilters({ filters, setFilters, hasCollection, releasedElements }) {
  const set = (key, value) => setFilters((f) => ({ ...f, [key]: value }));
  const toggleInSet = (key, value) => setFilters((f) => {
    const next = new Set(f[key]);
    next.has(value) ? next.delete(value) : next.add(value);
    return { ...f, [key]: next };
  });
  // Held-back elements (Ice/Magnetic/Black Flame) don't get a chip at all —
  // a filter for content you can't select behind it is worse than no chip.
  const visibleElements = ELEMENTS.filter((el) => releasedElements.has(el.key));

  return (
    <div className="space-y-6">
      <div>
        <input
          type="text"
          placeholder="Search cards…"
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
          className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
        />
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-white/40">Element</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {visibleElements.map((el) => (
            <button
              key={el.key}
              type="button"
              onClick={() => toggleInSet("elements", el.key)}
              className="rounded-full border px-2.5 py-1 text-xs font-medium transition-colors"
              style={{
                borderColor: filters.elements.has(el.key) ? el.color : "rgba(255,255,255,0.15)",
                color: filters.elements.has(el.key) ? el.color : "rgba(255,255,255,0.5)",
                backgroundColor: filters.elements.has(el.key) ? `${el.color}1a` : "transparent",
              }}
            >
              {el.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-white/40">Type</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleInSet("types", t)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                filters.types.has(t)
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300"
                  : "border-white/15 text-white/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-white/40">Cost</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {COSTS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggleInSet("costs", c)}
              className={`h-7 w-7 rounded-full border text-xs font-semibold transition-colors ${
                filters.costs.has(c)
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300"
                  : "border-white/15 text-white/50"
              }`}
            >
              {c === 5 ? "5+" : c}
            </button>
          ))}
        </div>
      </div>

      {hasCollection && (
        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            checked={filters.ownedOnly}
            onChange={(e) => set("ownedOnly", e.target.checked)}
            className="accent-cyan-400"
          />
          Owned only
        </label>
      )}
    </div>
  );
}
