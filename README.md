# Focus Website

The info hub for **Focus**, PlayersMakingGames' Expandable Card Game: how to play, a live leaderboard, and a shop preview. Next.js (App Router) + Tailwind v4.

Deployed on Vercel, but **not reachable at its own domain** — `next.config.mjs` sets `basePath: "/focus"`, and it's meant to be reached at [pmg.cards/focus](https://pmg.cards/focus), transparently proxied there by [PMG_Website](https://github.com/PlayersMakingGames/Pmg_Website)'s `rewrites()`. Hitting this deployment's own root URL directly will 404 by design.

## Pages

- **Home** (`/focus`) — pitch, element roster, Coming to Steam, CTA into the game
- **How to Play** — turn structure, zones, Skill stages, Surge/Regen
- **Leaderboard** — top 50 players by wins, read live from Supabase
- **Shop** — read-only preview of the in-game catalog (purchases happen in-app, not here)

The leaderboard and shop read directly from the *same* Supabase project the game itself uses (`public.profiles`, `public.shop_items`, both with open `SELECT` policies) — real data, not a mirror that can drift out of sync.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Where it's used |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Leaderboard, Shop |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Leaderboard, Shop (public/publishable key — safe client-side) |
| `NEXT_PUBLIC_APP_URL` | "Play Now" links — where the actual game lives |

## Running locally

```bash
npm install
npm run dev
```

Since `basePath` is set, local pages are served at `http://localhost:3000/focus`, not the bare root.

## Deploying

Pushing to `master` auto-deploys via Vercel's GitHub integration. If this deployment's URL ever changes, update the `destination` in PMG_Website's `next.config.mjs` rewrites to match.
