// Deck codes — ports FocusSim/src/deckCode.js's encodeDeck/decodeDeck
// verbatim (same format, same "FD1-" prefix, same checksum), rewritten to
// take `cardsById` (the fetched public.cards rows) as a parameter instead
// of importing the static CARDS module — this site fetches the catalog at
// runtime. A code minted here decodes correctly in FocusSim (and the
// Discord bot's /deck command) and vice versa, since the byte layout is
// unchanged:
//
//   [0] version (1)
//   [1] leader card number
//   [2] entry count
//   [3..] (card number, copies) pairs
//   [last] checksum — sum of every preceding byte, mod 256
//
// The checksum is typo detection, not security.

export const VERSION = 1;
export const PREFIX = "FD1-";

const numberOf = (cardId) => Number(String(cardId).split("-")[1]);
const idOf = (n) => `FB1-${String(n).padStart(2, "0")}`;

function toBase64Url(bytes) {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromBase64Url(text) {
  const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

const checksum = (bytes) => bytes.reduce((a, b) => (a + b) & 0xff, 0);

export function encodeDeck(deck) {
  const { leader, counts } = deck;
  const leaderNum = numberOf(leader);
  if (!Number.isInteger(leaderNum) || leaderNum < 1 || leaderNum > 255) {
    throw new Error(`cannot encode leader "${leader}"`);
  }

  const entries = Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([id, n]) => [numberOf(id), n])
    .sort((a, b) => a[0] - b[0]);

  if (entries.length > 255) throw new Error("too many distinct cards to encode");

  const bytes = [VERSION, leaderNum, entries.length];
  for (const [num, n] of entries) {
    if (!Number.isInteger(num) || num < 1 || num > 255) throw new Error(`cannot encode card number ${num}`);
    if (n < 1 || n > 255) throw new Error(`cannot encode ${n} copies`);
    bytes.push(num, n);
  }
  bytes.push(checksum(bytes));
  return PREFIX + toBase64Url(bytes);
}

// Returns { deck } or { error }. Never throws — this is user input pasted
// from chat, and every failure is something to tell the player.
export function decodeDeck(input, cardsById) {
  const raw = String(input || "").trim();
  const match = raw.match(/FD1-[A-Za-z0-9_-]+/);
  if (!match) return { error: "That does not look like a deck code. They start with “FD1-”." };

  let bytes;
  try { bytes = fromBase64Url(match[0].slice(PREFIX.length)); }
  catch { return { error: "That deck code is not readable — it looks truncated or altered." }; }

  if (bytes.length < 5) return { error: "That deck code is too short to be a deck." };

  const body = Array.from(bytes.slice(0, -1));
  if (checksum(body) !== bytes[bytes.length - 1]) {
    return { error: "That deck code failed its checksum — a character is wrong. Copy it again rather than retyping it." };
  }
  if (body[0] !== VERSION) {
    return { error: `That code is version ${body[0]}; this builder reads version ${VERSION}.` };
  }

  const leader = idOf(body[1]);
  if (!cardsById[leader] || cardsById[leader].type !== "leader") {
    return { error: "That code names a Leader that does not exist." };
  }

  const entryCount = body[2];
  if (body.length !== 3 + entryCount * 2) {
    return { error: "That deck code is incomplete — part of it is missing." };
  }

  const counts = {};
  for (let i = 0; i < entryCount; i++) {
    const id = idOf(body[3 + i * 2]);
    const n = body[4 + i * 2];
    if (!cardsById[id]) return { error: `That code contains a card that does not exist (${id}).` };
    counts[id] = (counts[id] || 0) + n;
  }

  return { deck: { leader, counts } };
}
