import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyEmail } from "@/components/CopyEmail";
import {
  accountDeletionConfig as cfg,
  accountDeletionReady,
  accountDeletionVisible,
  DELETION_EMAIL_SUBJECT,
} from "@/lib/account-deletion";

export function generateMetadata(): Metadata {
  // Reveal nothing (not even the title) while the page is unpublished.
  if (!accountDeletionVisible) return {};
  return {
    title: "Delete Your Account",
    description:
      "How to delete your Elite Body Fitness Pros account and associated data, what is deleted, and what is kept.",
    robots: accountDeletionReady ? undefined : { index: false, follow: false },
  };
}

const h2 =
  "mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-sm";
const p = "mt-3 leading-8 text-[var(--muted)]";
const ul = "mt-4 list-disc space-y-2 pl-6 leading-8 text-[var(--muted)]";
const ol = "mt-4 list-decimal space-y-2 pl-6 leading-8 text-[var(--muted)]";
const link = "break-all text-[var(--neon)] underline";

/** Draft-only marker for values the owner has not confirmed. Never shown in production. */
const Pending = ({ what }: { what: string }) => (
  <span className="rounded bg-yellow-500/20 px-1 text-yellow-300">
    [Pending owner approval: {what}]
  </span>
);

export default function AppAccountDeletionPage() {
  // Unpublished (404) in production until the owner confirms every required value.
  if (!accountDeletionVisible || !cfg.supportEmail) notFound();
  const email = cfg.supportEmail;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(DELETION_EMAIL_SUBJECT)}`;

  return (
    <section className="section-pad">
      <article className="container-site mx-auto max-w-3xl px-4 sm:px-6">
        {!accountDeletionReady && (
          <p className="mb-6 rounded border border-yellow-500/50 bg-yellow-500/10 p-3 text-sm text-yellow-300">
            Draft for review &mdash; not final. Highlighted items are pending
            owner approval.
          </p>
        )}
        <h1 className="heading-lg">Delete Your Account</h1>
        <p className={p}>
          Elite Body Fitness Pros LLC &middot; Elite Body Fitness Pros app
        </p>
        <p className={p}>
          You can ask us to delete your Elite Body Fitness Pros account and the
          data linked to it. This page explains how to make the request, what
          is deleted, and what is kept.
        </p>

        <h2 className={h2}>Option 1: Delete in the app</h2>
        <ol className={ol}>
          <li>Open the Elite Body Fitness Pros app and go to Profile.</li>
          <li>Tap &quot;Delete account&quot;.</li>
          <li>
            Confirm. Your account is deleted once the request has been
            processed successfully. If an error message appears, the request
            did not complete: try again, or use Option 2 below.
          </li>
        </ol>

        <h2 className={h2}>Option 2: Request deletion by email</h2>
        <p className={p}>
          If you cannot open the app, you do not need to reinstall it or log
          in. Send us an email request:
        </p>
        <ol className={ol}>
          <li>
            Send an email to{" "}
            <a href={mailto} className={link}>
              {email}
            </a>{" "}
            from the email address registered to your app account.
          </li>
          <li>
            Use the subject line:{" "}
            <strong className="text-white">{DELETION_EMAIL_SUBJECT}</strong>
          </li>
          <li>
            Our administrative team checks that the request came from the
            owner of that email address, and may reply to confirm this.
          </li>
          <li>
            We will respond to your request within {cfg.responseTime}. This is
            the time we take to respond to you. It is not a promise that
            deletion will be completed within that time.
          </li>
        </ol>
        <p className={p}>
          <a href={mailto} className="text-[var(--neon)] underline">
            Open a pre-filled email
          </a>{" "}
          or copy the address:
        </p>
        <CopyEmail email={email} />
        <p className={p}>
          Never send your password or payment card details by email. We will
          never ask for them.
        </p>

        <h2 className={h2}>What is deleted</h2>
        <ul className={ul}>
          <li>
            Your account: name, email, age, gender, height, weight and stored
            password hash.
          </li>
          <li>Your profile photo and any other file you uploaded.</li>
          <li>
            Your access to the programs you bought on the account is removed.
            Deleting your account does not automatically issue a refund.
            Contact us with any payment or refund questions.
          </li>
          <li>Payment attempts that were never completed.</li>
          <li>
            Once deletion has been processed successfully, every login on
            every device stops working. If you use the same email later, it
            creates a new, empty account.
          </li>
        </ul>
        <p className={p}>
          Programs that were never linked to an account and belong to the phone
          itself are not removed, and other accounts on the same phone are not
          affected.
        </p>

        <h2 className={h2}>What is kept</h2>
        <p className={p}>
          We keep a payment record for each completed purchase. The link to
          your name, email and device is removed from our database. The record
          contains:
        </p>
        <ul className={ul}>
          <li>
            Program name, currency, price, sales tax amount and rate, and
            total.
          </li>
          <li>The order reference and the Stripe payment references.</li>
          <li>The order status and the dates of payment and delivery.</li>
          <li>
            A short technical log of the order. After your account is deleted,
            it keeps only the step name, the outcome and the time of each
            step, plus a short failure code if the order failed.
          </li>
        </ul>
        <p className={p}>
          Why: so the sale can be matched to the Stripe payment record and used
          to handle payment disputes and sales-tax records.
        </p>
        <p className={p}>
          How long:{" "}
          {cfg.paymentRecordRetention ?? <Pending what="payment record retention" />}
        </p>

        <h2 className={h2}>Kept by other parties or in other places</h2>
        <p className={p}>The delete button does not remove the following:</p>
        <ul className={ul}>
          <li>
            <strong className="text-white">Stripe</strong> keeps its own
            payment records (email, billing details and payment details) under
            its own policies. Stripe may still be able to connect a payment to
            you.
          </li>
          <li>
            <strong className="text-white">Emails already sent</strong> to you
            stay in your own inbox. We keep a copy of each &quot;new
            purchase&quot; notice in our own mailbox
            {cfg.purchaseNoticeRetention
              ? `, ${cfg.purchaseNoticeRetention}`
              : " until it is removed by hand"}
            .
          </li>
          <li>
            <strong className="text-white">Database backups</strong> can hold a
            copy of your data.{" "}
            {cfg.backupRetention ?? <Pending what="backup retention" />}
          </li>
          <li>
            <strong className="text-white">Server logs</strong> may contain
            technical records of your use.{" "}
            {cfg.logRetention ?? <Pending what="log retention" />}
          </li>
        </ul>

        <h2 className={h2}>Related</h2>
        <p className={p}>
          See our{" "}
          <Link
            href="/app-privacy-policy"
            className="text-[var(--neon)] underline"
          >
            App Privacy Policy
          </Link>{" "}
          for how we handle your information.
        </p>
        <p className="mt-6 text-sm text-[var(--muted)]">
          &copy; 2026 Elite Body Fitness Pros LLC. All Rights Reserved.
        </p>
      </article>
    </section>
  );
}
