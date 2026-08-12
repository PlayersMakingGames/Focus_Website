import ComingSoonPanel from "@/components/ComingSoonPanel";

export const metadata = {
  title: "My Decks — Focus",
  description: "Your saved Focus decks — coming soon.",
};

export default function MyDecks() {
  return (
    <ComingSoonPanel
      eyebrow="Decks / My Decks"
      title="My Decks"
      description="Once website sign-in ships, this page will show every deck saved to your account — the exact same list Focus Online's in-app Deck Library already reads, since a deck saved from either place lives in one shared account, not two separate copies."
      needs="Website sign-in against your Focus account."
    />
  );
}
