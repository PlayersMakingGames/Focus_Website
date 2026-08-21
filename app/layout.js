import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Focus: An Elemental Expandable Card Game",
  description:
    "Focus is an elemental expandable card game (ECG) of Units, Skills, and Leaders. Build a deck around one of 5 Elements and outplay your opponent in fast, tactical Bo3 matches.",
  keywords: [
    "Focus",
    "Focus TCG",
    "Focus card game",
    "Focus ECG",
    "expandable card game",
    "elemental card game",
    "Fire Earth Lightning Water Wind",
    "free online card game",
    "browser card game",
    "strategy card game",
    "Bo3 card game",
    "deck builder card game",
    "PlayersMakingGames",
    "competitive card game",
    "no randomized packs",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-white">
        <AuthProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
