export const metadata = {
  title: "Terms of Service — Focus",
  description: "Terms of Service governing your use of Focus.",
};

export default function TermsOfService() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight">Focus ECG - Terms of Service</h1>
      <p className="mt-4 text-sm text-white/50">Last Updated: 7/20/2026</p>

      <div className="mt-14 space-y-10 text-white/70 [&_p]:leading-relaxed [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white">
        <section>
          <h2>Article 1 (Agreement to Terms)</h2>
          <p>
            These Terms of Service (the &quot;Terms&quot;) govern the relationship between you (the
            &quot;User&quot;) and Players Making Games (&quot;We,&quot; &quot;Us,&quot; or
            &quot;Our&quot;) regarding your use of the Focus web application, game, and related
            services (collectively, the &quot;Service&quot;).
          </p>
          <p className="mt-4">
            By creating an account, logging in, or using the Service in any way, you agree to be
            bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you
            may not use the Service.
          </p>
          <p className="mt-4">
            If the User is a minor, they must obtain the consent of a parent or legal guardian
            before using the Service or making any in-app purchases.
          </p>
          <p className="mt-4">
            <strong className="text-white/85">Discord Integration and Bot Usage:</strong> The
            Service includes interactions with our official Discord bot (&quot;Oracle&quot;). By
            using the bot, you agree to adhere to both these Terms and Discord&rsquo;s official
            Terms of Service. We reserve the right to restrict or ban your Discord account from
            interacting with the bot or our community servers if you abuse the bot&apos;s
            commands, attempt to exploit the verification systems, or violate our community
            guidelines.
          </p>
        </section>

        <section>
          <h2>Article 2 (User Accounts)</h2>
          <p>
            To access features such as multiplayer matchmaking and inventory, Users must create an
            account. Account authentication and data are securely managed via our third-party
            provider, Supabase.
          </p>
          <p className="mt-4">
            Users are strictly responsible for maintaining the confidentiality of their login
            credentials. Any actions taken through a User&rsquo;s account will be deemed to have
            been taken by the User themselves.
          </p>
          <p className="mt-4">
            <strong className="text-white/85">Account Sharing and Trading:</strong> Users may not
            sell, trade, rent, or share their accounts with any third party.
          </p>
        </section>

        <section>
          <h2>Article 3 (Virtual Currency and In-Game Items)</h2>
          <p>
            The Service may include virtual in-game currency (&quot;Gold&quot;) and virtual items
            (such as digital cards, deck boxes, and alternate arts), collectively referred to as
            &quot;Virtual Goods.&quot;
          </p>
          <p className="mt-4">
            <strong className="text-white/85">Third-Party Payment Processor:</strong> All
            real-money purchases for Virtual Goods are securely processed by our authorized
            Merchant of Record, Xsolla. By making a purchase, you also agree to Xsolla&rsquo;s
            Terms of Service and Privacy Policy. We do not store your personal financial
            information.
          </p>
          <p className="mt-4">
            <strong className="text-white/85">No Real-World Value:</strong> Virtual Goods are
            licensed to you, not sold. They have no real-world monetary value and cannot be
            exchanged for cash, real-world property, or services outside of the game.
          </p>
          <p className="mt-4">
            All sales of Virtual Goods are final and non-refundable, except where required by
            applicable law.
          </p>
        </section>

        <section>
          <h2>Article 4 (Prohibited Conduct)</h2>
          <p>
            To maintain competitive integrity and a safe environment on our leaderboards and
            matches, Users agree not to engage in the following prohibited actions:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5">
            <li>
              <strong className="text-white/85">Cheating &amp; Exploits:</strong> Using bots,
              macros, unauthorized third-party software, or exploiting game bugs to gain an unfair
              advantage.
            </li>
            <li>
              <strong className="text-white/85">Real Money Trading (RMT):</strong> Selling, buying,
              or trading Virtual Goods, match outcomes, or accounts for real-world money outside of
              the Service.
            </li>
            <li>
              <strong className="text-white/85">Toxicity &amp; Harassment:</strong> Spamming Quick
              Chat presets, using offensive or inappropriate Usernames, or harassing other players.
            </li>
            <li>
              <strong className="text-white/85">Interference:</strong> Attempting to hack, disrupt,
              or overwhelm the game servers or databases.
            </li>
          </ul>
          <p className="mt-4">
            Violation of any of these rules may result in immediate account suspension, removal
            from leaderboards, or permanent bans at our sole discretion.
          </p>
        </section>

        <section>
          <h2>Article 5 (Handling of Personal Data)</h2>
          <p>
            We collect and process User data (such as account details, match history, and device
            data) to operate the game, maintain leaderboards, and process transactions.
          </p>
          <p className="mt-4">
            Details regarding how we collect, use, and share data with our partners (such as
            Supabase and Xsolla) are outlined in our{" "}
            <a href="/focus/privacy" className="text-cyan-400 hover:underline">
              Privacy Policy
            </a>
            , which is incorporated herein by reference.
          </p>
        </section>

        <section>
          <h2>Article 6 (Intellectual Property Rights)</h2>
          <p>
            <strong className="text-white/85">Proprietary Content:</strong> All underlying
            intellectual property in the Service—including but not limited to game mechanics,
            software code, database structures, UI design, logos, lore, and text—is the exclusive
            property of Players Making Games and is protected by applicable copyright and
            trademark laws.
          </p>
          <p className="mt-4">
            <strong className="text-white/85">AI-Generated Assets:</strong> The User acknowledges
            that certain visual assets within the Service, including specific card artwork and
            background illustrations, have been created utilizing generative Artificial
            Intelligence (AI) tools.
          </p>
          <p className="mt-4">
            <strong className="text-white/85">Usage Limitations:</strong> While raw AI-generated
            images may not be subject to traditional copyright protection, the compilation,
            specific layout, and overall card design (including the combination of art, borders,
            text, and game stats) are proprietary to Us. Users may not scrape, extract,
            commercially distribute, or sell any game assets, cards, or digital items directly from
            the Service.
          </p>
          <p className="mt-4">
            <strong className="text-white/85">License to Play:</strong> The User is granted a
            limited, non-exclusive, non-transferable, and revocable license to access and use the
            Service and its contents strictly for personal, non-commercial entertainment purposes.
          </p>
        </section>

        <section>
          <h2>Article 7 (Modification and Termination of Service)</h2>
          <p>
            We reserve the right to update, modify, or change the Service, including card
            balancing, game rules, and available Virtual Goods, at any time without prior notice.
          </p>
          <p className="mt-4">
            We reserve the right to suspend or terminate the Service entirely upon reasonable
            notice to the Users. In the event of Service termination, all licenses to Virtual Goods
            will expire, and no refunds will be provided unless required by law.
          </p>
        </section>

        <section>
          <h2>Article 8 (Disclaimer of Warranties)</h2>
          <p>
            The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We
            do not guarantee that the Service will be uninterrupted, error-free, or entirely secure
            from malicious attacks.
          </p>
          <p className="mt-4">
            We are not responsible for internet connection issues, device incompatibilities, or
            lost match states resulting from external factors.
          </p>
        </section>

        <section>
          <h2>Article 9 (Limitation of Liability)</h2>
          <p>
            To the maximum extent permitted by law, We shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of or relating to
            your use of the Service, including loss of data, loss of Virtual Goods, or unauthorized
            access to your account.
          </p>
        </section>

        <section>
          <h2>Article 10 (Governing Law and Jurisdiction)</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Oklahoma.
          </p>
          <p className="mt-4">
            Any disputes arising out of or in connection with these Terms shall be subject to the
            exclusive jurisdiction of the courts located in Oklahoma.
          </p>
        </section>
      </div>
    </div>
  );
}
