import Link from "next/link";
import { cardImageUrl } from "@/lib/cardImage";
import { STEAM_STORE_URL, ALPHA_SIGNUP_URL, TRAILER_URL, DISCORD_URL } from "@/lib/links";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 300;

// The released Leaders' card ids, for the hero's card fan (Ice, Magnetic
// and Black Flame stay out — held back for the alpha, CLAUDE.md).
const HERO_LEADER_IDS = ["FB1-21", "FB1-55", "FB1-43", "FB1-99", "FB1-106"];

function newsBadge(kind) {
  if (kind === "patch") return "UPDATE";
  if (kind === "event") return "EVENT";
  return "ANNOUNCEMENT";
}

function formatNewsDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function Home() {
  // Same public, no-role-restricted read FocusSim's own in-game News UI
  // uses (supabase/news.sql — the policy carries no `to` clause, so it's
  // PUBLIC, not `to authenticated`). Real posts, not invented marketing copy.
  const { data: newsPosts } = await supabase
    .from("news_posts")
    .select("id, kind, title, published_at")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("pinned", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-hud-grid">
        <div className="glow-cyan pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
          <span className="hud-cut-sm border border-cyan-400/30 px-3 py-1 text-xs font-semibold tracking-widest text-cyan-300">
            A COMPETITIVE ELEMENTAL CARD GAME
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-extrabold uppercase tracking-tight sm:text-6xl">
            Master the <span className="text-cyan-400">Elements</span>.
            <br />
            Outplay your <span className="text-cyan-400">Opponent</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            Focus is a fast, tactical expandable card game. Build a deck
            around one of 5 Elements, manage your Focus, and take down your
            opponent&rsquo;s Leader in head-to-head Bo3 matches.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={ALPHA_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="hud-cut-sm bg-cyan-400 px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-cyan-300"
            >
              Sign Up for Alpha
            </a>
            {TRAILER_URL && (
              <a
                href={TRAILER_URL}
                target="_blank"
                rel="noreferrer"
                className="hud-cut-sm border border-white/20 px-8 py-3 text-base font-semibold text-white transition-colors hover:border-white/40"
              >
                Watch Trailer
              </a>
            )}
            <Link
              href="/how-to-play"
              className="hud-cut-sm border border-white/20 px-8 py-3 text-base font-semibold text-white transition-colors hover:border-white/40"
            >
              Learn How to Play
            </Link>
          </div>

          {/* Real card art — the 5 released Leaders, fanned. Rotation/offset
              live on the outer wrapper (inline style, per-card and static);
              the hover "pop" lives on the inner img via group-hover, so it
              composes with the outer transform instead of fighting it. z-index
              is a class (z-[var(--z)]), not inline style, specifically so
              hover:z-50 is able to win over it on hover. */}
          <div className="mt-16 flex justify-center pb-6">
            {HERO_LEADER_IDS.map((id, i) => {
              const offset = i - (HERO_LEADER_IDS.length - 1) / 2;
              return (
                <div
                  key={id}
                  className="group relative z-[var(--z)] hover:z-50"
                  style={{
                    transform: `rotate(${offset * 8}deg) translateY(${Math.abs(offset) * 16}px)`,
                    marginLeft: i === 0 ? 0 : "-2rem",
                    "--z": 10 - Math.abs(offset),
                  }}
                >
                  <img
                    src={cardImageUrl(id)}
                    alt=""
                    className="w-24 rounded-lg border border-white/10 shadow-2xl shadow-black/60 transition-transform duration-200 ease-out group-hover:-translate-y-4 group-hover:scale-125 group-hover:border-cyan-400/60 group-hover:shadow-cyan-400/30 sm:w-36"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Focus Online / Paper Focus */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="hud-cut border border-cyan-400/20 bg-white/[0.03] p-8">
            <span className="hud-cut-sm inline-block border border-cyan-400/30 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-300">
              NOW LIVE
            </span>
            <h2 className="mt-4 text-2xl font-bold">Focus Online</h2>
            <p className="mt-2 text-sm text-white/60">
              Compete in fast-paced strategic battles, right in your browser.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/70">
              {["Ranked Matches", "Free Alpha Access", "Regular Updates", "Earn Rewards"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/decks/builder"
              className="mt-6 inline-block text-sm font-semibold text-cyan-300 hover:underline"
            >
              Open the Deck Builder →
            </Link>
          </div>

          <div className="hud-cut border border-white/10 bg-white/[0.02] p-8">
            <span className="hud-cut-sm inline-block border border-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/50">
              COMING SOON
            </span>
            <h2 className="mt-4 text-2xl font-bold text-white/80">Paper Focus</h2>
            <p className="mt-2 text-sm text-white/60">
              Bring the game to the table with physical cards.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/50">
              {["Same Cards", "Same Rules", "Different Experience"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/shop#paper"
              className="mt-6 inline-block text-sm font-semibold text-white/60 hover:underline"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Coming to Steam */}
      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#66c0f4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="8.5" cy="15.5" r="2" />
            <path d="M10.2 14 14 10.2" />
            <circle cx="15.5" cy="8.5" r="2" />
          </svg>
          <span className="hud-cut-sm border border-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/50">
            COMING SOON
          </span>
          <h2 className="text-3xl font-bold">Focus is heading to Steam</h2>
          <p className="max-w-xl text-white/60">
            We're bringing the full Focus experience to Steam — the same fixed, fair card pool,
            no different treatment by platform. The free browser version below isn't going
            anywhere either; Steam is another way in, not a replacement.
          </p>
          {STEAM_STORE_URL ? (
            <a
              href={STEAM_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="hud-cut-sm bg-[#66c0f4] px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-[#8dd3ff]"
            >
              View on Steam
            </a>
          ) : (
            <span className="hud-cut-sm border border-white/15 px-8 py-3 text-base font-semibold text-white/40">
              Steam page coming soon
            </span>
          )}
        </div>
      </section>

      {/* Latest News + Stay Connected */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold">Latest News</h2>
                <Link href="/news" className="text-xs font-semibold text-cyan-300 hover:underline">
                  View All →
                </Link>
              </div>
              {newsPosts && newsPosts.length > 0 ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {newsPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/news#${post.id}`}
                      className="hud-cut-sm block border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-cyan-400/40"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
                        {newsBadge(post.kind)}
                      </span>
                      <h3 className="mt-2 text-sm font-semibold leading-snug text-white/90">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-xs text-white/40">
                        {formatNewsDate(post.published_at)}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm text-white/50">No news yet — check back soon.</p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold">Stay Connected</h2>
              <p className="mt-2 text-sm text-white/60">
                Join our community and never miss an update.
              </p>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="hud-cut-sm mt-4 inline-block border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-cyan-400/40"
              >
                Join Discord →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
