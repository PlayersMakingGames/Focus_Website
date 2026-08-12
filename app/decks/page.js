import Link from "next/link";

export const metadata = {
  title: "Decks — Focus",
  description: "Build, save, and share Focus decks.",
};

const DECK_FEATURES = [
  {
    href: "/decks/builder",
    title: "Deck Builder",
    description:
      "Pick a Leader, browse the full card pool, and build a legal 36-card deck right in the browser.",
    live: true,
  },
  {
    href: "/decks/mine",
    title: "My Decks",
    description:
      "Decks you've saved to your account — the same list Focus Online's own Deck Library reads, since both share one account.",
    live: true,
  },
  {
    href: "/decks/community",
    title: "Community Decks",
    description:
      "Browse decks other players have made public, with a shareable link for each one.",
    live: false,
  },
  {
    href: "/decks/builder",
    title: "Import Deck",
    description:
      "Paste a deck code (the same format used in-game and by the Discord bot's /deck command) to load it straight into the builder.",
    live: true,
  },
];

export default function DecksHub() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight">Build once. Play anywhere.</h1>
      <p className="mt-4 max-w-xl text-white/60">
        A deck builder that runs on the same card database and account
        system Focus Online already uses — a deck you build here is the same
        deck you see in the app. Sign in with your Focus account to use it.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DECK_FEATURES.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="hud-cut border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-cyan-400/30"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-white">{f.title}</h3>
              {!f.live && (
                <span className="shrink-0 rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-semibold text-white/40">
                  COMING SOON
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-white/60">{f.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
