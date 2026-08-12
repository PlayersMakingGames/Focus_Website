// TODO: set this once the Steam store page exists. Every "Coming Soon"
// fallback on the site depends on this staying null until then.
export const STEAM_STORE_URL = null;

// The game itself isn't open for direct play yet — every "play" CTA on the
// site points here instead, so visitors can look around first and decide
// whether to request alpha access.
export const ALPHA_SIGNUP_URL = "https://forms.gle/qigoHWWdP2C1uGHs9";

// TODO: set this once a trailer exists. The hero's "Watch Trailer" button
// only renders when this is non-null — no dead/disabled button in the most
// important conversion spot on the site in the meantime.
export const TRAILER_URL = null;

// Real, live invite — also hard-coded in FocusSim's src/App.jsx:41 and
// server/index.js. This is this site's single source of truth for it; the
// duplication across repos is pre-existing, not introduced here.
export const DISCORD_URL = "https://discord.gg/XZHGSHQMXD";
