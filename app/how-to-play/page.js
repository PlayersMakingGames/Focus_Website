export const metadata = {
  title: "How to Play — Focus TCG",
  description:
    "Learn the rules of Focus: turn structure, Units, Skills, Rally cards, and how to win.",
};

const PHASES = [
  {
    name: "Gather",
    text: "At the start of each of your turns you automatically draw back up to your minimum hand size (5 cards by default).",
  },
  {
    name: "Focus",
    text: "Cards from the top of your deck are automatically added to your Focus zone. How many is printed on your Leader — this is the resource you'll tap to pay costs.",
  },
  {
    name: "Main",
    text: "The bulk of the turn. Play Units by paying their Focus cost, play Skills under your Units, cast Skills you've already played, set Skills face-down, play a Rally card under your Leader, and activate abilities.",
  },
  {
    name: "Return",
    text: "End your turn. Everything face-up you didn't spend — cast Skills, used Focus, an uncast Rally card — sweeps to the Drop pile. Only face-down cards stay in play for next turn.",
  },
];

const SKILL_STAGES = [
  { name: "Play", text: "Place a Skill under one of your Units. Always free." },
  { name: "Cast", text: "Pay the Skill's Focus cost to activate it." },
  { name: "Resolve", text: "Its effect happens. An untargeted attack hits whatever sits directly across it — the enemy unit in the same lane, or their Leader if that lane is empty." },
];

export default function HowToPlay() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight">How to Play</h1>
      <p className="mt-4 text-white/60">
        Focus is a head-to-head trading card game. Reduce your opponent&rsquo;s
        Leader to 0 HP before they do the same to you. Matches are best-of-3.
      </p>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">The Turn Structure</h2>
        <p className="mt-2 text-white/60">
          Every turn moves through four phases, in order:
        </p>
        <ol className="mt-6 space-y-6">
          {PHASES.map((phase, i) => (
            <li key={phase.name} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 text-sm font-semibold text-cyan-400">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{phase.name}</h3>
                <p className="mt-1 text-sm text-white/60">{phase.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Zones</h2>
        <dl className="mt-6 space-y-5">
          <div>
            <dt className="font-semibold">Leader</dt>
            <dd className="mt-1 text-sm text-white/60">
              Your Element&rsquo;s champion. Sets your Focus generation, carries
              a per-turn activated ability, and is what your opponent is
              really trying to kill.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Focus</dt>
            <dd className="mt-1 text-sm text-white/60">
              Your resource. Tap Focus cards to pay for Units, Skills, and
              abilities.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Units</dt>
            <dd className="mt-1 text-sm text-white/60">
              Played to a lane for a Focus cost. Each carries a Skill Zone
              underneath it.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Skills</dt>
            <dd className="mt-1 text-sm text-white/60">
              Go three stages: Play (free, face-up under a Unit), Cast (pay
              its cost), Resolve (its effect happens). Any Skill can instead
              be set face-down to hide it — your opponent can&rsquo;t tell what
              it is until you cast it, it resolves, or it&rsquo;s revealed.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Standby Skills</dt>
            <dd className="mt-1 text-sm text-white/60">
              A special kind of Skill that reacts to something your opponent
              does — always played face-down. It sits hidden until its
              trigger condition happens, then you choose whether to pay its
              cost and react. You never cast it yourself.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Rally</dt>
            <dd className="mt-1 text-sm text-white/60">
              Works like a Skill, but plays under your Leader instead of a
              Unit.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Drop Pile &amp; Oblivion</dt>
            <dd className="mt-1 text-sm text-white/60">
              Spent, face-up cards land in your Drop pile at Return. Cards
              removed from the game entirely go to Oblivion instead.
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Playing a Skill</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {SKILL_STAGES.map((stage, i) => (
            <div key={stage.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-semibold text-cyan-400">
                {i + 1}. {stage.name}
              </div>
              <p className="mt-2 text-sm text-white/60">{stage.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Two Rules to Watch For</h2>
        <dl className="mt-6 space-y-5">
          <div>
            <dt className="font-semibold">Surge</dt>
            <dd className="mt-1 text-sm text-white/60">
              A passive bonus that switches on for any card at 25 HP or less
              — a reward for playing on when you&rsquo;re behind.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Regen</dt>
            <dd className="mt-1 text-sm text-white/60">
              If you ever have to draw or gain Focus with an empty deck, your
              Drop pile shuffles back in as your new deck — but your Leader
              takes 5 damage each time. It keeps you in the game, but it
              isn&rsquo;t free.
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-14 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-8 text-center">
        <h2 className="text-2xl font-bold">Best learned by doing</h2>
        <p className="mt-3 text-white/60">
          Focus has a full in-app Tutorial that walks you through a real game
          turn by turn — Gather, Focus, Main, and Return — ending with you
          winning your first match.
        </p>
      </section>
    </div>
  );
}
