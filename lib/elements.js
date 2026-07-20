// Marketing copy for the 8 playable Elements. Mirrors the mono/hybrid split
// and flavor text in FocusSim's src/elements.js, kept as a separate copy
// here since this is a standalone site with no shared package between the
// two repos.
export const ELEMENTS = [
  {
    key: "Fire",
    label: "Fire",
    tier: "mono",
    color: "#ff6a3d",
    description:
      "Fast and aggressive — burns the opponent's leader down directly before they can stabilize.",
  },
  {
    key: "Earth",
    label: "Earth",
    tier: "mono",
    color: "#7fb069",
    description:
      "Sturdy and resource-heavy — builds up Focus and grinds out card advantage while shrugging off early pressure.",
  },
  {
    key: "Lightning",
    label: "Lightning",
    tier: "mono",
    color: "#f4c542",
    description:
      "High tempo, big card draw — refills your hand fast and punishes any opening the opponent leaves.",
  },
  {
    key: "Water",
    label: "Water",
    tier: "mono",
    color: "#4aa8ff",
    description:
      "Control-oriented — repositions the board and turns the opponent's own units against them.",
  },
  {
    key: "Wind",
    label: "Wind",
    tier: "mono",
    color: "#5fe0c9",
    description:
      "Resourceful and skill-focused — recurs spent Skills from the Drop pile and grinds out long games.",
  },
  {
    key: "BlackFlame",
    label: "Black Flame",
    tier: "hybrid",
    color: "#b23a48",
    description:
      "A Fire hybrid built around discarding your own hand to fuel devastating mill and burn effects.",
  },
  {
    key: "Ice",
    label: "Ice",
    tier: "hybrid",
    color: "#8fd9e8",
    description:
      "A Water/Wind hybrid that locks down the board by stacking ice counters on enemy units.",
  },
  {
    key: "Magnetic",
    label: "Magnetic",
    tier: "hybrid",
    color: "#c86bf2",
    description:
      "An Earth/Lightning hybrid built around repositioning and recycling your own units for repeated value.",
  },
];

export const MONO_ELEMENTS = ELEMENTS.filter((e) => e.tier === "mono");
export const HYBRID_ELEMENTS = ELEMENTS.filter((e) => e.tier === "hybrid");
