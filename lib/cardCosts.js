// Focus cost for every non-Leader card, generated once from
// FocusSim/src/cards.js (Leaders have no printed cost, so they're absent
// here on purpose). public.cards has no cost column — see the Pass 2 plan
// for why — so this is a small, hand-synced supplement, same pattern as
// FocusSim's own SQL files re-declaring ALL_ELEMENTS by hand. Update by
// re-running the extraction script in the Pass 2 plan notes whenever
// FocusSim's card pool changes.
export const CARD_COSTS = {
  "FB1-01": 4, "FB1-02": 0, "FB1-03": 0, "FB1-04": 0, "FB1-05": 0, "FB1-06": 1,
  "FB1-07": 1, "FB1-08": 1, "FB1-10": 0, "FB1-11": 1, "FB1-12": 0, "FB1-13": 0,
  "FB1-14": 0, "FB1-15": 0, "FB1-16": 2, "FB1-17": 0, "FB1-18": 1, "FB1-19": 1,
  "FB1-20": 2, "FB1-22": 3, "FB1-23": 5, "FB1-24": 0, "FB1-25": 0, "FB1-26": 1,
  "FB1-27": 2, "FB1-28": 1, "FB1-29": 1, "FB1-30": 1, "FB1-31": 0, "FB1-32": 0,
  "FB1-33": 0, "FB1-34": 0, "FB1-35": 2, "FB1-36": 2, "FB1-37": 1, "FB1-38": 2,
  "FB1-39": 0, "FB1-40": 1, "FB1-41": 0, "FB1-42": 1, "FB1-44": 4, "FB1-45": 1,
  "FB1-46": 1, "FB1-47": 1, "FB1-48": 0, "FB1-49": 0, "FB1-50": 1, "FB1-51": 0,
  "FB1-52": 1, "FB1-54": 1, "FB1-56": 2, "FB1-57": 1, "FB1-58": 4, "FB1-59": 1,
  "FB1-60": 1, "FB1-61": 1, "FB1-62": 0, "FB1-63": 0, "FB1-64": 0, "FB1-65": 1,
  "FB1-66": 1, "FB1-67": 2, "FB1-68": 0, "FB1-69": 1, "FB1-70": 0, "FB1-71": 0,
  "FB1-72": 2, "FB1-73": 1, "FB1-74": 0, "FB1-75": 2, "FB1-77": 0, "FB1-78": 0,
  "FB1-79": 0, "FB1-80": 3, "FB1-81": 0, "FB1-82": 1, "FB1-83": 1, "FB1-84": 1,
  "FB1-85": 1, "FB1-86": 0, "FB1-87": 0, "FB1-88": 0, "FB1-89": 1, "FB1-90": 0,
  "FB1-91": 0, "FB1-92": 1, "FB1-93": 3, "FB1-94": 0, "FB1-95": 1, "FB1-96": 1,
  "FB1-97": 1, "FB1-98": 3, "FB1-100": 0, "FB1-101": 1, "FB1-102": 0,
  "FB1-103": 0, "FB1-104": 1, "FB1-105": 1, "FB1-107": 0, "FB1-108": 0,
  "FB1-109": 0, "FB1-110": 1, "FB1-111": 0, "FB1-112": 1, "FB1-113": 3,
  "FB1-114": 0, "FB1-115": 0, "FB1-116": 1, "FB1-117": 1,
};

export function costOf(cardId) {
  return CARD_COSTS[cardId] ?? null;
}
