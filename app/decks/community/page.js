import ComingSoonPanel from "@/components/ComingSoonPanel";

export const metadata = {
  title: "Community Decks — Focus",
  description: "Decks shared publicly by other Focus players — coming soon.",
};

export default function CommunityDecks() {
  return (
    <ComingSoonPanel
      eyebrow="Decks / Community Decks"
      title="Community Decks"
      description="Browse decks other players have made public, each with its own shareable link — good for posting a build to Discord, Reddit, or a tournament thread."
      needs="The Deck Builder and account sign-in, both still to come."
    />
  );
}
