import Link from "next/link";

const NAV_LINKS = [
  { href: "/how-to-play", label: "How to Play" },
  { href: "/shop", label: "Shop" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export default function Header() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "#";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
          <span className="text-cyan-400">FOCUS</span>
          <span className="text-white/50">TCG</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={appUrl}
          className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300"
        >
          Play Now
        </a>
      </div>
    </header>
  );
}
