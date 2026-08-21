import CommunityDecksView from "@/components/CommunityDecksView";

export const metadata = {
  title: "Community Decks · Focus",
  description: "Decks shared publicly by other Focus players.",
};

export default function CommunityDecks() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight">Community Decks</h1>
      <p className="mt-4 max-w-xl text-white/60">
        Decks other players have made public, each with its own
        shareable link, good for posting a build to Discord, Reddit, or a
        tournament thread.
      </p>
      <CommunityDecksView />
    </div>
  );
}
