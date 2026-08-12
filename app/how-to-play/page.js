import { cardImageUrl } from "@/lib/cardImage";

export const metadata = {
  title: "How to Play — Focus",
  description:
    "Learn the rules of Focus: turn structure, Units, Skills, Rally cards, and how to win.",
};

// One Element (Fire) used throughout as the illustrative example — real
// card art via cardImageUrl, the same helper Collection/Deck Builder use,
// not a separate set of screenshots to keep in sync.
const CARD = {
  leader: "FB1-43", // Magus Dracostar
  unit: "FB1-33", // Fire Apprentice
  skill: "FB1-34", // Fire Blast
  rally: "FB1-36", // Fire Explosion
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

// Only real board zones — a card SITS in one of these. Standby is
// deliberately not its own entry here: it's a way a Skill can be played
// (face-down instead of face-up), not a place a card exists that a Skill
// doesn't already occupy. It's folded into the Skills entry instead.
const ZONES = [
  {
    name: "Leader",
    art: CARD.leader,
    text: "Your Element's champion. Sets your Focus generation, carries a per-turn activated ability, and is what your opponent is really trying to kill.",
  },
  {
    name: "Focus",
    text: "Your resource. Tap Focus cards to pay for Units, Skills, and abilities.",
  },
  {
    name: "Units",
    art: CARD.unit,
    text: "Played to a lane for a Focus cost. Each carries a Skill Zone underneath it.",
  },
  {
    name: "Skills",
    art: CARD.skill,
    text: "Go three stages: Play (free, face-up under a Unit), Cast (pay its cost), Resolve (its effect happens). Any Skill can instead be set face-down to hide it — your opponent can't tell what it is until you cast it, it resolves, or it's revealed. A Skill set face-down like this is called a Standby Skill: it's not a separate zone, just a hidden card in the same Skill Zone. It sits there until its own trigger condition happens, then you choose whether to pay its cost and react — you never cast a Standby yourself.",
  },
  {
    name: "Rally",
    art: CARD.rally,
    text: "Works like a Skill, but plays under your Leader instead of a Unit.",
  },
  {
    name: "Drop Pile & Oblivion",
    text: "Spent, face-up cards land in your Drop pile at Return. Cards removed from the game entirely go to Oblivion instead.",
  },
];

const RULES = [
  {
    name: "Surge",
    accent: "amber",
    text: "A passive bonus that switches on for any card at 25 HP or less — a reward for playing on when you're behind.",
  },
  {
    name: "Regen",
    accent: "cyan",
    text: "If you ever have to draw or gain Focus with an empty deck, your Drop pile shuffles back in as your new deck — but your Leader takes 5 damage each time. It keeps you in the game, but it isn't free.",
  },
];

const ACCENT_STYLES = {
  amber: "border-amber-400/30 bg-amber-400/5 text-amber-300",
  cyan: "border-cyan-400/30 bg-cyan-400/5 text-cyan-300",
};

function FlowStep({ index, total, name, children }) {
  return (
    <div className="flex items-center gap-3">
      <div className="hud-cut-sm flex-1 border border-white/10 bg-white/[0.03] p-5">
        <div className="text-sm font-semibold text-cyan-400">
          {index + 1}. {name}
        </div>
        <p className="mt-2 text-sm text-white/60">{children}</p>
      </div>
      {index < total - 1 && (
        <span className="hidden shrink-0 text-lg text-white/20 sm:block">→</span>
      )}
    </div>
  );
}

export default function HowToPlay() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight">How to Play</h1>
      <p className="mt-4 max-w-2xl text-white/60">
        Focus is a head-to-head expandable card game. Reduce your opponent&rsquo;s
        Leader to 0 HP before they do the same to you. Matches are best-of-3.
      </p>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">The Turn Structure</h2>
        <p className="mt-2 text-white/60">
          Every turn moves through four phases, in order, then loops back to Gather:
        </p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {PHASES.map((phase, i) => (
            <FlowStep key={phase.name} index={i} total={PHASES.length} name={phase.name}>
              {phase.text}
            </FlowStep>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Zones</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ZONES.map((zone) => (
            <div key={zone.name} className="hud-cut-sm flex gap-4 border border-white/10 bg-white/[0.03] p-5">
              {zone.art && (
                <img
                  src={cardImageUrl(zone.art)}
                  alt=""
                  className="h-24 w-auto shrink-0 rounded-md border border-white/10 object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold text-white">{zone.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{zone.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Playing a Skill</h2>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-stretch">
          {SKILL_STAGES.map((stage, i) => (
            <FlowStep key={stage.name} index={i} total={SKILL_STAGES.length} name={stage.name}>
              {stage.text}
            </FlowStep>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Two Rules to Watch For</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {RULES.map((rule) => (
            <div
              key={rule.name}
              className={`hud-cut-sm border p-5 ${ACCENT_STYLES[rule.accent]}`}
            >
              <h3 className="font-semibold">{rule.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/70">{rule.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hud-cut mt-14 border border-cyan-400/20 bg-cyan-400/5 p-8 text-center">
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
