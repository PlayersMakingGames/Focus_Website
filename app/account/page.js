import ComingSoonPanel from "@/components/ComingSoonPanel";

export const metadata = {
  title: "Account — Focus",
  description: "Sign in and manage your Focus account — coming soon.",
};

export default function Account() {
  return (
    <ComingSoonPanel
      eyebrow="Account"
      title="Sign In & Account"
      description="Website sign-in is coming next — using your existing Focus Online account, so My Decks, Digital Collection, and everything else that needs an account works the moment you log in here. Profile and settings management will live here too."
      needs="This is the sign-in feature itself — nothing else is blocking it."
    />
  );
}
