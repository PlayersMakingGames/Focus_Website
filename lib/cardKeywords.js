// Detects which of Focus's four keyword call-outs apply to a card, and
// supplies their definitions — the same explanatory boxes FocusSim's own
// CardInspectOverlay shows (FocusSim/src/App.jsx:10660-10816). Definitions
// are copied verbatim from there (:10668/10671/10678/10687) so this site
// never contradicts what the game itself tells a player a keyword means.
//
// Surge and Unveil are pure functions of text/skill_type (both already on
// public.cards). Skill Link and Trigger are NOT text-detectable — FocusSim's
// own rules.js keeps them as explicit allowlists rather than a regex over
// printed text (a "Trigger —" scan catches every Unveil card by mistake),
// so this reads the is_trigger/is_skill_link columns the card-text.sql
// migration generated from those same allowlists, instead of re-deriving
// a second, driftable copy of them here.
//
// The numeric per-turn-activation-cap hints FocusSim also shows
// (PT_LIMITS/SURGE_PT_LIMITS) are a deeper strategy layer on top of these
// keyword definitions and are out of scope here — see the Pass 4 plan.

const SURGE_HP_THRESHOLD = 25; // mirrors FocusSim/src/rules.js:298

function surgeText(card) {
  if (card.surge_text) return card.surge_text;
  const idx = card.text ? card.text.indexOf("Surge —") : -1;
  return idx >= 0 ? card.text.slice(idx) : null;
}

export function keywordHints(card) {
  const hints = [];

  if (surgeText(card)) {
    hints.push({
      key: "surge",
      label: "Surge",
      text: `Surge — activates once this card's HP drops to ${SURGE_HP_THRESHOLD} or below.`,
    });
  }
  if (card.is_skill_link) {
    hints.push({
      key: "skillLink",
      label: "Skill Link",
      text: "Skill Link — this ability's effect depends on how many Skills you've cast this turn.",
    });
  }
  if (card.skill_type === "standby" || card.text?.includes("Unveil —")) {
    hints.push({
      key: "unveil",
      label: "Unveil",
      text: "Unveil — A keyword that lets you flip a card during your opponent's turn when you meet the specific condition.",
    });
  }
  if (card.is_trigger && card.skill_type !== "standby") {
    hints.push({
      key: "trigger",
      label: "Trigger",
      text: "Trigger — A reactive ability. It activates when its printed condition is met.",
    });
  }

  return hints;
}
