"use client";

export default function DeckValidation({ issues }) {
  const legal = issues.length === 0;

  return (
    <div className={`hud-cut-sm border p-4 ${legal ? "border-cyan-400/30 bg-cyan-400/5" : "border-red-400/30 bg-red-400/5"}`}>
      <div className={`text-sm font-semibold ${legal ? "text-cyan-300" : "text-red-400"}`}>
        {legal ? "DECK VALID" : "DECK INVALID"}
      </div>
      {legal ? (
        <p className="mt-2 text-xs text-white/50">
          ✓ Legal Leader · ✓ Correct card count · ✓ Copy limits satisfied
        </p>
      ) : (
        <ul className="mt-2 space-y-1">
          {issues.map((issue, i) => (
            <li key={i} className="text-xs text-white/60">
              <span className="text-red-400">×</span> {issue}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
