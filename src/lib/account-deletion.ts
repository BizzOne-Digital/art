/**
 * Owner-confirmed values for the account deletion page.
 * Leave a value as null until the owner has confirmed it. Never fill a
 * value in just to switch the page on.
 */
export const accountDeletionConfig = {
  /** Owner-confirmed address for emailed deletion requests. */
  supportEmail: "art@elitebodyfitnesspros.com" as string | null,
  /**
   * Owner-confirmed time to RESPOND to a request (not to complete deletion).
   * Handled by the administrative department.
   */
  responseTime: "5 to 7 business days" as string | null,
  /** How long completed-purchase payment records are kept. NOT confirmed. */
  paymentRecordRetention: null as string | null,
  /** How long the business keeps "new purchase" notices in its mailbox. NOT confirmed. */
  purchaseNoticeRetention: null as string | null,
  /**
   * Verified in the MongoDB Atlas dashboard: 6-hourly and daily snapshots 7 days,
   * weekly 4 weeks, monthly 12 months, yearly 1 year, point-in-time window 7 days.
   * Automatic snapshot export is NOT verified, so exports are not mentioned.
   */
  backupRetention:
    "Our scheduled database snapshots are kept for up to 12 months, so a copy of your data can remain in a scheduled snapshot for up to 12 months after your account is deleted. Deleting your account does not remove it from existing backups immediately." as
      | string
      | null,
  /**
   * Verified in the Vercel dashboard (Pro plan, Observability Plus): runtime logs
   * kept 30 days; no log drains on the project. Applies to runtime logs only.
   */
  logRetention:
    "Our hosting provider, Vercel, keeps runtime logs for 30 days." as
      | string
      | null,
};

/** Subject line users are asked to use. */
export const DELETION_EMAIL_SUBJECT = "App Account Deletion Request";

/**
 * Public publication gate. The page, footer link and policy section are
 * live only when every required value has been confirmed by the owner.
 */
export const accountDeletionReady =
  accountDeletionConfig.supportEmail !== null &&
  accountDeletionConfig.responseTime !== null &&
  accountDeletionConfig.paymentRecordRetention !== null &&
  accountDeletionConfig.backupRetention !== null &&
  accountDeletionConfig.logRetention !== null;

/**
 * Explicit client-review switch. Set ACCOUNT_DELETION_REVIEW=1 ONLY in the
 * Vercel Preview environment (never Production). Even if it is set by mistake
 * on Production, VERCEL_ENV=production keeps the draft hidden.
 */
export const accountDeletionPreview =
  process.env.ACCOUNT_DELETION_REVIEW === "1" &&
  process.env.VERCEL_ENV !== "production";

export const accountDeletionVisible =
  accountDeletionReady || accountDeletionPreview;
