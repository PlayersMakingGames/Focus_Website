import Link from "next/link";
import { DISCORD_URL } from "@/lib/links";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-sm text-white/40">
        <div className="flex flex-col items-center justify-between gap-4 sm:w-full sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Focus. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/how-to-play" className="hover:text-white/70">How to Play</Link>
            <Link href="/decks" className="hover:text-white/70">Decks</Link>
            <Link href="/collection" className="hover:text-white/70">Collection</Link>
            <Link href="/shop" className="hover:text-white/70">Shop</Link>
            <Link href="/leaderboard" className="hover:text-white/70">Leaderboard</Link>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="hover:text-white/70">Discord</a>
          </div>
        </div>
        <div className="flex gap-6 text-xs text-white/30">
          <Link href="/terms" className="hover:text-white/60">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-white/60">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
