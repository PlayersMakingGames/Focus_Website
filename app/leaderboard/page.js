import { supabase } from "@/lib/supabaseClient";

export const metadata = {
  title: "Leaderboard — Focus TCG",
  description: "Top Focus players ranked by wins.",
};

// profiles has an open SELECT policy (no auth data lives on it — see
// supabase/schema.sql), so this reads it directly with the anon key.
export const revalidate = 120;

export default async function LeaderboardPage() {
  const { data: players, error } = await supabase
    .from("profiles")
    .select("username, favorite_element, games_played, wins")
    .gt("games_played", 0)
    .order("wins", { ascending: false })
    .order("games_played", { ascending: true })
    .limit(50);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight">Leaderboard</h1>
      <p className="mt-4 text-white/60">Top 50 players, ranked by wins.</p>

      {error && (
        <p className="mt-10 text-sm text-red-400">
          Couldn&rsquo;t load the leaderboard right now. Please try again shortly.
        </p>
      )}

      {!error && (!players || players.length === 0) && (
        <p className="mt-10 text-sm text-white/50">
          No ranked players yet — be the first to play a match.
        </p>
      )}

      {!error && players && players.length > 0 && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] text-left text-white/50">
                <th className="px-5 py-3 font-medium">#</th>
                <th className="px-5 py-3 font-medium">Player</th>
                <th className="px-5 py-3 font-medium">Element</th>
                <th className="px-5 py-3 text-right font-medium">Wins</th>
                <th className="px-5 py-3 text-right font-medium">Played</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, i) => (
                <tr
                  key={`${player.username}-${i}`}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-5 py-3 text-white/50">{i + 1}</td>
                  <td className="px-5 py-3 font-medium">
                    {player.username || "Anonymous Duelist"}
                  </td>
                  <td className="px-5 py-3 text-white/60">
                    {player.favorite_element || "—"}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-cyan-400">
                    {player.wins}
                  </td>
                  <td className="px-5 py-3 text-right text-white/50">
                    {player.games_played}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
