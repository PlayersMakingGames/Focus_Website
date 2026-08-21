import { supabase } from "@/lib/supabaseClient";

export const metadata = {
  title: "News · Focus",
  description: "Patch notes, announcements, and updates from Focus.",
};

// public.news_posts' SELECT policy carries no `to` clause (see
// FocusSim/supabase/news.sql) — it's PUBLIC, the same real feed
// FocusSim's own in-game News UI reads, not a separate invented one.
export const revalidate = 120;

const KIND_LABELS = { patch: "UPDATE", announcement: "ANNOUNCEMENT", event: "EVENT" };
const KIND_COLORS = {
  patch: "text-cyan-300",
  announcement: "text-white/70",
  event: "text-amber-300",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const { data: posts, error } = await supabase
    .from("news_posts")
    .select("id, kind, title, body, version, starts_at, ends_at, published_at")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("pinned", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(100);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight">News</h1>
      <p className="mt-4 text-white/60">
        Patch notes, announcements, and everything else shipping in Focus,
        the same feed you see in Focus Online itself.
      </p>

      {error && (
        <p className="mt-10 text-sm text-red-400">
          Couldn&rsquo;t load news right now. Please try again shortly.
        </p>
      )}

      {!error && (!posts || posts.length === 0) && (
        <p className="mt-10 text-sm text-white/50">
          No news yet. Check back soon.
        </p>
      )}

      {!error && posts && posts.length > 0 && (
        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              id={post.id}
              className="hud-cut-sm scroll-mt-24 border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`text-xs font-semibold uppercase tracking-widest ${
                    KIND_COLORS[post.kind] || "text-white/60"
                  }`}
                >
                  {KIND_LABELS[post.kind] || post.kind}
                </span>
                {post.version && (
                  <span className="text-xs text-white/40">v{post.version}</span>
                )}
                <span className="text-xs text-white/40">
                  {formatDate(post.published_at)}
                </span>
              </div>
              <h2 className="mt-2 text-lg font-bold text-white">{post.title}</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/70">
                {post.body}
              </p>
              {post.kind === "event" && post.starts_at && (
                <p className="mt-3 text-xs text-amber-300/80">
                  {formatDate(post.starts_at)}
                  {post.ends_at ? ` – ${formatDate(post.ends_at)}` : ""}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
