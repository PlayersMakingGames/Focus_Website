import AccountView from "@/components/AccountView";

export const metadata = {
  title: "Account · Focus",
  description: "Sign in to your Focus account.",
};

export default function Account() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight">Account</h1>
      <p className="mt-4 max-w-xl text-white/60">
        Sign in with your existing Focus Online account to build and save
        decks. A deck saved here is the same account FocusSim itself reads,
        not a separate copy.
      </p>
      <AccountView />
    </div>
  );
}
