// Shared shell for every not-yet-built hub page (Decks, Collection,
// Account). Deliberately not bare "Coming Soon" text — each caller explains
// what the feature actually is and what it depends on, so a visitor
// understands the roadmap rather than hitting a dead end.
export default function ComingSoonPanel({ eyebrow, title, description, needs, children }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <span className="inline-block rounded-full border border-cyan-400/30 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-300">
        COMING SOON
      </span>
      {eyebrow && (
        <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/40">
          {eyebrow}
        </div>
      )}
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-4 max-w-xl text-white/60">{description}</p>

      {needs && (
        <div className="hud-cut mt-8 border border-white/10 bg-white/[0.03] p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-white/40">
            Depends on
          </div>
          <p className="mt-2 text-sm text-white/60">{needs}</p>
        </div>
      )}

      {children}
    </div>
  );
}
