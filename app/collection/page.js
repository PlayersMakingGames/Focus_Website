import CollectionView from "@/components/CollectionView";

export const metadata = {
  title: "Collection — Focus",
  description: "Your Focus card collection, digital and physical.",
};

export default function Collection() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight">Collection</h1>
      <p className="mt-4 max-w-xl text-white/60">
        Which cards you own — the Elements and cosmetics unlocked in Focus
        Online, tied to the same account as everywhere else on this site.
      </p>
      <CollectionView />
    </div>
  );
}
