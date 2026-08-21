import { supabase } from "@/lib/supabaseClient";

export const metadata = {
  title: "Shop · Focus",
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
  foil_token: "Foil Tokens",
  menu_background: "Menu Backgrounds",
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
        One catalog, two ways to play: digital goods for Focus Online today,
        with Paper Focus, the physical card game, on the way.
      </p>

      {/* ---------------------------------------------------------------
          Focus Online (Digital) — the real, live catalog.
      --------------------------------------------------------------- */}
      <section id="digital" className="mt-14 scroll-mt-24">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Focus Online</h2>
          <span className="rounded-full border border-cyan-400/40 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-cyan-300">
            DIGITAL
          </span>
        </div>
        <p className="mt-2 max-w-xl text-sm text-white/60">
          Elements, cosmetics, and alternate arts, priced in Gold. Sign in to
          the app to buy, where the price always matches what you see here.
        </p>

        {error && (
          <p className="mt-10 text-sm text-red-400">
            Couldn&rsquo;t load the catalog right now. Please try again shortly.
          </p>
        )}

        {!error && grouped.size === 0 && (
          <p className="mt-10 text-sm text-white/50">No items available.</p>
        )}

        <div className="mt-10 space-y-14">
          {Array.from(grouped.entries()).map(([category, categoryItems]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-white/80">
                {CATEGORY_LABELS[category] || category}
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="hud-cut flex flex-col border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold">{item.name}</h4>
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
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-cyan-400">
                        {item.cost.toLocaleString()} Gold
                      </span>
                      <span className="rounded border border-cyan-400/30 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-cyan-300">
                        DIGITAL
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Paper Focus (Physical) — vision only. No products, no pricing:
          there's no commerce/fulfillment infrastructure for this yet, so
          this section stays a teaser rather than pretending otherwise.
      --------------------------------------------------------------- */}
      <section id="paper" className="mt-24 scroll-mt-24 border-t border-white/10 pt-14">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Paper Focus</h2>
          <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-white/50">
            PHYSICAL
          </span>
        </div>
        <div className="hud-cut mt-6 max-w-2xl border border-white/10 bg-white/[0.02] p-8">
          <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/50">
            COMING SOON
          </span>
          <p className="mt-4 text-white/60">
            Build once. Play anywhere. Paper Focus will bring the exact same
            cards, Leaders, and Elements from Focus Online to the table, so
            any deck you build works in both places. Nothing is purchasable
            here yet.
          </p>
        </div>
      </section>
    </div>
  );
}
