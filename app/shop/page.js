import { supabase } from "@/lib/supabaseClient";

export const metadata = {
  title: "Shop — Focus TCG",
  description: "Browse Elements, cosmetics, and alternate arts available in Focus.",
};

// Public catalog read straight from Supabase at request time — same
// shop_items table and RLS policy (select where active) the game client
// reads from, so this page never drifts out of sync with the real catalog.
// This is a preview only: purchases themselves happen in-app, where
// purchase_item() enforces price/ownership server-side.
export const revalidate = 300;

const CATEGORY_LABELS = {
  element: "Elements",
  deck_box: "Deck Boxes",
  card_sleeve: "Card Sleeves",
  alt_art: "Alternate Arts",
  quick_chat_emote: "Quick Chat Emotes",
  avatar: "Avatars",
  playmat: "Playmats",
};

export default async function ShopPage() {
  const { data: items, error } = await supabase
    .from("shop_items")
    .select("id, name, description, cost, category, coming_soon")
    .eq("active", true)
    .order("cost", { ascending: true });

  const grouped = new Map();
  for (const item of items || []) {
    const key = item.category || "other";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(item);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight">Shop</h1>
      <p className="mt-4 max-w-xl text-white/60">
        Elements, cosmetics, and alternate arts, priced in Gold. Sign in to
        the app to buy — every purchase there is verified server-side, so
        prices always match what&rsquo;s shown here.
      </p>

      {error && (
        <p className="mt-10 text-sm text-red-400">
          Couldn&rsquo;t load the catalog right now. Please try again shortly.
        </p>
      )}

      {!error && grouped.size === 0 && (
        <p className="mt-10 text-sm text-white/50">No items available.</p>
      )}

      <div className="mt-14 space-y-14">
        {Array.from(grouped.entries()).map(([category, categoryItems]) => (
          <section key={category}>
            <h2 className="text-xl font-bold">
              {CATEGORY_LABELS[category] || category}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    {item.coming_soon && (
                      <span className="shrink-0 rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/50">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="mt-2 flex-1 text-sm text-white/60">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-4 text-sm font-semibold text-cyan-400">
                    {item.cost.toLocaleString()} Gold
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
