import ComingSoonPanel from "@/components/ComingSoonPanel";

export const metadata = {
  title: "Deck Builder — Focus",
  description: "Build a legal Focus deck from the full card pool — coming soon.",
};

export default function DeckBuilder() {
  return (
    <ComingSoonPanel
      eyebrow="Decks / Deck Builder"
      title="Deck Builder"
      description="Pick a Leader, filter the full card pool by Element, type, and cost, and build toward a legal 36-card deck with live validation — the same rules Focus Online itself checks when you queue for a ranked match."
      needs="Sign-in (Focus's card database is only readable by signed-in accounts, matching how Focus Online itself works) and the full card catalog wired up on the website."
    />
  );
}
