import Link from "next/link";
import { ELEMENTS } from "@/lib/elements";
import { STEAM_STORE_URL, ALPHA_SIGNUP_URL } from "@/lib/links";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center">
          <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl">
            Master the <span className="text-cyan-400">Elements</span>.
            <br />
            Outplay your opponent.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            Focus is a fast, tactical trading card game. Build a deck around
            one of 8 Elements, manage your Focus, and take down your
            opponent&rsquo;s Leader in head-to-head Bo3 matches.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={ALPHA_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-cyan-400 px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-cyan-300"
            >
              Sign Up for Alpha
            </a>
            <Link
              href="/how-to-play"
              className="rounded-full border border-white/20 px-8 py-3 text-base font-semibold text-white transition-colors hover:border-white/40"
            >
              Learn How to Play
            </Link>
          </div>
        </div>
      </section>

      {/* Elements */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Choose Your Element</h2>
          <p className="mt-3 text-white/60">
            5 mono Elements, and 3 hybrids built from combining them.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ELEMENTS.map((el) => (
            <div
              key={el.key}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: el.color }}
                />
                <h3 className="text-lg font-semibold">{el.label}</h3>
                {el.tier === "hybrid" && (
                  <span className="ml-auto rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/50">
                    Hybrid
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-white/60">{el.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coming to Steam */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#66c0f4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="8.5" cy="15.5" r="2" />
            <path d="M10.2 14 14 10.2" />
            <circle cx="15.5" cy="8.5" r="2" />
          </svg>
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/50">
            COMING SOON
          </span>
          <h2 className="text-3xl font-bold">Focus is heading to Steam</h2>
          <p className="max-w-xl text-white/60">
            We're bringing the full Focus experience to Steam — the same eight elements and the
            same fixed, fair card pool, no different treatment by platform. The free browser
            version below isn't going anywhere either; Steam is another way in, not a replacement.
          </p>
          {STEAM_STORE_URL ? (
            <a
              href={STEAM_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#66c0f4] px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-[#8dd3ff]"
            >
              View on Steam
            </a>
          ) : (
            <span className="rounded-full border border-white/15 px-8 py-3 text-base font-semibold text-white/40">
              Steam page coming soon
            </span>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">Ready to duel?</h2>
          <p className="max-w-md text-white/60">
            Focus is in alpha — sign up and we'll get you into the browser
            client, where you can claim your two free starter Elements and
            challenge a friend with a room code.
          </p>
          <a
            href={ALPHA_SIGNUP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-cyan-400 px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-cyan-300"
          >
            Sign Up for Alpha
          </a>
        </div>
      </section>
    </div>
  );
}
