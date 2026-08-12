import Link from "next/link";
import MyDecksView from "@/components/MyDecksView";

export const metadata = {
  title: "My Decks — Focus",
  description: "Your saved Focus decks.",
};

export default function MyDecks() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">My Decks</h1>
          <p className="mt-2 text-white/60">
            The same decks Focus Online&rsquo;s own Deck Library reads — one
            account, one deck list.
          </p>
        </div>
        <Link
          href="/decks/builder"
          className="hud-cut-sm hidden shrink-0 bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 sm:block"
        >
          New Deck
        </Link>
      </div>
      <MyDecksView />
    </div>
  );
}
