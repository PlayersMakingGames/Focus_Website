// Deck-legality rules for the website Deck Builder — mirrors the legality
// subset of FocusSim/src/rules.js and the legalityIssues() checklist format
// from FocusSim/src/deckCode.js. Kept in sync by hand, same as those two
// files are already kept in sync with supabase/deck-legality.sql (see the
// comments there) — not a new duplication pattern, the third instance of
// an established one.
//
// Operates on rows shaped like public.cards (id, base_card_id, name, type,
// element, elements, skill_type, max_copies) rather than FocusSim's CARDS
// object — that table already carries every field this needs; see the Pass
// 2 plan for why cost/hp/text aren't part of this (display-only, and public
// .cards doesn't have them either).
//
// `cardsById` is always passed in explicitly (a { [id]: row } map built from
// the fetched public.cards rows) rather than imported as a module constant,
// since this site fetches the catalog at runtime instead of bundling it.

import { costOf } from "./cardCosts";

export const DECK_SIZE = 36; // total, Leader included
export const NON_LEADER_DECK_SIZE = DECK_SIZE - 1; // what `counts` must add up to
export const GROUP_LABELS = { unit: "Units", skill: "Skills", rally: "Rally" };

export function normalizeDeck(deck) {
  return deck && deck.leader ? deck : { leader: null, counts: (deck && deck.counts) || {} };
}

export function deckCount(counts) {
  return Object.values(counts).reduce((a, b) => a + b, 0);
}

// A card's full element set: primary plus any duality elements.
export function cardElements(card) {
  return card.elements && card.elements.length ? card.elements : [card.element];
}

// Mirrors rules.js:91-96 — mono-element leaders can only run mono-element
// cards of that exact element; multi-element leaders accept any card whose
// element set overlaps theirs.
export function cardLegalForLeader(card, leaderCard) {
  if (!card || !leaderCard) return false;
  const leaderEls = cardElements(leaderCard);
  const cardEls = cardElements(card);
  if (leaderEls.length === 1) return cardEls.length === 1 && cardEls[0] === leaderEls[0];
  return cardEls.some((el) => leaderEls.includes(el));
}

// Grouped-and-sorted decklist for display — shared by the builder's own
// deck panel, My Decks, and a public Community Deck page, so all three
// present a deck identically.
export function groupCounts(cardsById, counts) {
  const groups = { unit: [], skill: [], rally: [] };
  for (const [id, n] of Object.entries(counts)) {
    const card = cardsById[id];
    if (!card || n < 1) continue;
    (groups[card.type] ||= []).push({ card, n });
  }
  for (const list of Object.values(groups)) {
    list.sort((a, b) => (costOf(a.card.id) ?? 0) - (costOf(b.card.id) ?? 0) || a.card.name.localeCompare(b.card.name));
  }
  return groups;
}

export function deckPool(cardsById) {
  return Object.values(cardsById).filter((c) => c.type !== "leader").map((c) => c.id);
}
export function leaderIds(cardsById) {
  return Object.values(cardsById).filter((c) => c.type === "leader").map((c) => c.id);
}

// Mirrors rules.js:448-457 — a Rally with no subtype is grouped under
// "(none)" rather than dropped, so it doesn't dodge the one-per-subtype cap.
export function rallySubtypeCounts(cardsById, counts) {
  const out = {};
  for (const [id, n] of Object.entries(counts)) {
    const card = cardsById[id];
    if (!card || card.type !== "rally" || !n) continue;
    const sub = card.skill_type || "(none)";
    out[sub] = (out[sub] || 0) + n;
  }
  return out;
}

// Mirrors rules.js:496-507.
export function deckIsLegal(cardsById, deck) {
  const { leader, counts } = normalizeDeck(deck);
  const leaderCard = leader && cardsById[leader];
  if (!leaderCard || leaderCard.type !== "leader") return false;
  if (deckCount(counts) !== NON_LEADER_DECK_SIZE) return false;
  if (Object.values(rallySubtypeCounts(cardsById, counts)).some((n) => n > 1)) return false;
  return Object.entries(counts).every(([id, n]) => {
    const card = cardsById[id];
    if (!card || card.type === "leader") return false;
    return n >= 0 && n <= card.max_copies && cardLegalForLeader(card, leaderCard);
  });
}

// Mirrors deckCode.js:166-198's legalityIssues — same "why, in the order a
// player would want to fix it" checklist, minus ownership (this builder
// checks Owned via a separate filter toggle, not as a save-blocking rule —
// FocusSim's own player_decks doesn't enforce ownership at save time either,
// only at ranked-queue time).
export function legalityIssues(cardsById, deck) {
  const { leader, counts } = normalizeDeck(deck);
  const issues = [];
  const leaderCard = leader && cardsById[leader];

  if (!leaderCard || leaderCard.type !== "leader") {
    issues.push("Pick a Leader.");
  }

  const total = deckCount(counts);
  if (total !== NON_LEADER_DECK_SIZE) {
    issues.push(`This deck has ${total} cards besides the Leader; it needs exactly ${NON_LEADER_DECK_SIZE}.`);
  }

  for (const [id, n] of Object.entries(counts)) {
    const card = cardsById[id];
    if (!card) { issues.push(`${id} is not a card.`); continue; }
    if (card.type === "leader") { issues.push(`${card.name} is a Leader and cannot be in the main deck.`); continue; }
    if (n > card.max_copies) issues.push(`${n} copies of ${card.name}: the limit is ${card.max_copies}.`);
  }

  for (const [subtype, n] of Object.entries(rallySubtypeCounts(cardsById, counts))) {
    if (n > 1) issues.push(`${n} ${subtype} Rally cards: only one of each subtype is allowed.`);
  }

  if (leaderCard) {
    const offElement = Object.keys(counts)
      .filter((id) => cardsById[id] && cardsById[id].type !== "leader")
      .filter((id) => !cardLegalForLeader(cardsById[id], leaderCard));
    for (const id of offElement) issues.push(`${cardsById[id].name} does not match this Leader's Elements.`);
  }

  return issues;
}
