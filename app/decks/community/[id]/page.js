import SharedDeckView from "@/components/SharedDeckView";

export const metadata = {
  title: "Shared Deck · Focus",
  description: "A Focus deck shared by another player.",
};

export default async function SharedDeckPage({ params }) {
  const { id } = await params;
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-20">
      <SharedDeckView id={id} />
    </div>
  );
}
