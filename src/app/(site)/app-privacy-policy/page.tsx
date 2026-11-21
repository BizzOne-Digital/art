import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Privacy Policy",
  description:
    "Privacy Policy of Elite Body Fitness Pros LLC covering our website and downloadable fitness training applications.",
};

const h2 =
  "mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-sm";
const p = "mt-3 leading-8 text-[var(--muted)]";
const ul = "mt-4 list-disc space-y-2 pl-6 leading-8 text-[var(--muted)]";

export default function AppPrivacyPolicyPage() {
  return (
    <section className="section-pad">
      <article className="container-site mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="heading-lg">Privacy Policy</h1>
        <p className={p}>Elite Body Fitness Pros LLC</p>
        <p className="mt-1 leading-8 text-[var(--muted)]">
          Effective Date: October 27, 2026
        </p>

        <h2 className={h2}>Introduction</h2>
        <p className={p}>
          Elite Body Fitness Pros LLC (&quot;Company,&quot; &quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;) respects your privacy and is
          committed to protecting the personal information you provide when
          visiting our website, purchasing downloadable fitness training
          applications, or using our digital fitness products and services.
        </p>
        <p className={p}>
          This Privacy Policy explains how we collect, use, store, and protect
          your information.
        </p>

        <h2 className={h2}>Information We Collect</h2>
        <p className={p}>
          When you visit our website or purchase our downloadable fitness
          applications, we may collect the following information:
        </p>
        <ul className={ul}>
          <li>Full name</li>
          <li>Email address</li>
          <li>Billing information</li>
          <li>Purchase and transaction history</li>
          <li>Account information, if applicable</li>
          <li>Device information and website usage data</li>
          <li>Fitness goals or other information voluntarily provided</li>
        </ul>
        <p className={p}>
          Payment information may be processed through secure third-party
          payment processors. We do not intentionally store complete credit
          card numbers on our website.
        </p>

        <h2 className={h2}>How We Use Your Information</h2>
        <p className={p}>Information collected may be used to:</p>
        <ul className={ul}>
          <li>Process purchases and payments.</li>
          <li>Provide access to purchased fitness applications.</li>
          <li>Deliver downloadable digital products.</li>
          <li>Provide customer support.</li>
          <li>Send purchase confirmations and important account notifications.</li>
          <li>Improve our website, applications, and services.</li>
          <li>Prevent fraudulent transactions and unauthorized access.</li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
        <p className={p}>We do not sell your personal information for money.</p>

        <h2 className={h2}>Third-Party Services</h2>
        <p className={p}>
          Elite Body Fitness Pros LLC may use third-party providers for payment
          processing, website hosting, analytics, and digital product delivery.
        </p>
        <p className={p}>
          These providers may process information necessary to perform their
          services.
        </p>

        <h2 className={h2}>Data Security</h2>
        <p className={p}>
          We implement reasonable administrative, technical, and organizational
          measures to help protect personal information against unauthorized
          access, misuse, alteration, or disclosure.
        </p>
        <p className={p}>
          However, no internet-based system or electronic transmission can be
          guaranteed to be completely secure.
        </p>

        <h2 className={h2}>Cookies and Website Tracking</h2>
        <p className={p}>
          Our website may use cookies or similar technologies to improve website
          functionality, understand visitor activity, and enhance the customer
          experience.
        </p>
        <p className={p}>
          Where required by law, visitors will be provided with applicable
          cookie notices and choices.
        </p>

        <h2 className={h2}>Customer Privacy Rights</h2>
        <p className={p}>
          Depending on your location and applicable law, you may have rights to
          request access to, correction of, or deletion of your personal
          information, as well as other privacy choices.
        </p>
        <p className={p}>
          We will respond to verified privacy requests as required by
          applicable law.
        </p>

        <h2 className={h2}>Children&apos;s Privacy</h2>
        <p className={p}>
          Our website and digital fitness applications are intended for adults
          aged 18 and older.
        </p>
        <p className={p}>
          We do not knowingly collect personal information directly from
          children under 13.
        </p>

        <h2 className={h2}>Changes to This Privacy Policy</h2>
        <p className={p}>
          Elite Body Fitness Pros LLC reserves the right to modify this Privacy
          Policy as necessary to reflect changes in business practices,
          technology, or legal requirements.
        </p>
        <p className={p}>
          Updates will be posted on our website with a revised effective date.
        </p>

        <h2 className={h2}>Contact Information</h2>
        <p className={p}>For privacy-related questions, please contact:</p>
        <p className={p}>Elite Body Fitness Pros LLC</p>
        <p className="mt-1 leading-8 text-[var(--muted)]">
          Website:{" "}
          <a
            href="https://www.elitebodyfitnesspros.com"
            className="text-[var(--neon)] underline"
          >
            www.elitebodyfitnesspros.com
          </a>
        </p>
        <p className="mt-1 leading-8 text-[var(--muted)]">
          Email:{" "}
          <a
            href="mailto:art@elitebodyfitnesspros.com"
            className="break-all text-[var(--neon)] underline"
          >
            art@elitebodyfitnesspros.com
          </a>
        </p>
        <p className="mt-6 text-sm text-[var(--muted)]">
          © 2026 Elite Body Fitness Pros LLC. All Rights Reserved.
        </p>
      </article>
    </section>
  );
}
