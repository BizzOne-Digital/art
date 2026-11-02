import { readFileSync } from "fs";
import { resolve } from "path";
import { sendPurchaseEmails } from "../src/lib/mail";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  const content = readFileSync(path, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

async function main() {
  loadEnvLocal();

  const user = process.env.SMTP_USER;
  const owner = process.env.OWNER_EMAIL || user;
  if (!user || !process.env.SMTP_PASS) {
    console.error("Missing SMTP_USER or SMTP_PASS in .env.local");
    process.exit(1);
  }

  console.log("Sending SMTP test emails...");
  console.log(`SMTP user: ${user}`);
  console.log(`Owner inbox: ${owner}`);

  const result = await sendPurchaseEmails({
    customerName: "SMTP Test Customer",
    customerEmail: user,
    customerPhone: "555-0100",
    planName: "Elite Package (test)",
    planId: "plan-2",
    amountTotalUsd: "194.77",
    discountCode: "GETFITNOW",
    freeTeeIncluded: false,
    stripeSessionId: "cs_test_smtp_smoke_test",
  });

  if (result.ownerSent && result.customerSent) {
    console.log("OK — owner alert and customer thank-you both sent.");
    console.log(`Check inbox: ${owner}`);
    process.exit(0);
  }

  console.error("Partial or failed send:", result);
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
