import ComingSoonPanel from "@/components/ComingSoonPanel";

export const metadata = {
  title: "Collection — Focus",
  description: "Your Focus card collection, digital and physical — coming soon.",
};

export default function Collection() {
  return (
    <ComingSoonPanel
      eyebrow="Collection"
      title="Digital + Physical Collection"
      description="Track which cards you own — both the Elements and cosmetics unlocked in Focus Online, and, once Paper Focus exists as a real product, which physical cards you've registered to your account."
      needs="Website sign-in for Digital Collection. Physical Collection additionally needs Paper Focus itself to exist as a real, sellable product — there's no physical ownership tracking of any kind today, so this won't show placeholder data pretending otherwise."
    />
  );
}
