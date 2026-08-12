// Card art is served straight from FocusSim's own live deployment rather
// than duplicated into this repo — confirmed public, no auth, always in
// sync with whatever art FocusSim ships.
const FOCUS_ONLINE_ORIGIN = "https://focussim.up.railway.app";

export function cardImageUrl(cardId) {
  return `${FOCUS_ONLINE_ORIGIN}/cards/${cardId}.webp`;
}
