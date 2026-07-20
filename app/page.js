import Link from "next/link";
import { ELEMENTS } from "@/lib/elements";

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "#";

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
              href={appUrl}
              className="rounded-full bg-cyan-400 px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-cyan-300"
            >
              Play Now
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

      {/* CTA strip */}
      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">Ready to duel?</h2>
          <p className="max-w-md text-white/60">
            Jump into the browser client, claim your two free starter
            Elements, and challenge a friend with a room code.
          </p>
          <a
            href={appUrl}
            className="rounded-full bg-cyan-400 px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-cyan-300"
          >
            Play Focus in Your Browser
          </a>
        </div>
      </section>
    </div>
  );
}
