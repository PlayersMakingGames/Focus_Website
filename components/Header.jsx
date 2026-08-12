"use client";

import { useState } from "react";
import Link from "next/link";
import { ALPHA_SIGNUP_URL, DISCORD_URL } from "@/lib/links";
import { useAuth } from "@/lib/AuthContext";

// Each item is either a direct link ({ href, label }) or a dropdown group
// ({ label, items: [{ href, label, external? }] }). Only real destinations
// point at real pages — Decks/Collection all land on honest "coming soon"
// pages rather than fake data, per the ecosystem-hub foundation plan.
const NAV_GROUPS = [
  {
    label: "Game",
    items: [
      { href: ALPHA_SIGNUP_URL, label: "Play Focus Online", external: true },
      { href: "/how-to-play", label: "How to Play" },
    ],
  },
  {
    label: "Decks",
    items: [
      { href: "/decks/builder", label: "Deck Builder" },
      { href: "/decks/mine", label: "My Decks" },
      { href: "/decks/community", label: "Community Decks" },
      { href: "/decks/builder", label: "Import Deck" },
    ],
  },
  {
    label: "Collection",
    items: [
      { href: "/collection", label: "Digital Collection" },
      { href: "/collection", label: "Physical Collection" },
    ],
  },
  {
    label: "Shop",
    items: [
      { href: "/shop#digital", label: "Focus Online (Digital)" },
      { href: "/shop#paper", label: "Paper Focus (Physical)" },
    ],
  },
  {
    label: "Community",
    items: [
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/decks/community", label: "Community Decks" },
      { href: DISCORD_URL, label: "Discord", external: true },
    ],
  },
];

function NavDropdown({ group }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 py-2 text-sm font-medium tracking-wide text-white/70 transition-colors hover:text-white"
        aria-expanded={open}
      >
        {group.label.toUpperCase()}
        <span className="text-[10px] text-white/40">▾</span>
      </button>

      {open && (
        <div className="hud-cut-sm absolute left-0 top-full min-w-[200px] border border-cyan-400/20 bg-[#0a0f1c]/98 py-2 shadow-lg shadow-black/50">
          {group.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="block px-4 py-2 text-sm text-white/70 transition-colors hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
          <span className="text-cyan-400">FOCUS</span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_GROUPS.map((group) => (
            <NavDropdown key={group.label} group={group} />
          ))}
          <Link
            href="/account"
            className="flex items-center gap-1.5 py-2 text-sm font-medium tracking-wide text-white/70 transition-colors hover:text-white"
          >
            {user && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />}
            {user ? user.email.split("@")[0].toUpperCase() : "ACCOUNT"}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!user && (
            <Link
              href="/account"
              className="hud-cut-sm border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-white/40"
            >
              Sign In
            </Link>
          )}
          <a
            href={ALPHA_SIGNUP_URL}
            target="_blank"
            rel="noreferrer"
            className="hud-cut-sm bg-cyan-400 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300"
          >
            Sign Up for Alpha
          </a>
        </div>
      </div>
    </header>
  );
}
