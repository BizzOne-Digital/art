import nodemailer from "nodemailer";

export type PurchaseEmailPayload = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  planName: string;
  planId: string;
  amountTotalUsd: string;
  discountCode: string;
  freeTeeIncluded: boolean;
  stripeSessionId: string;
};

function getSmtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim()?.replace(/\s/g, "");
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || "587");

  if (!user || !pass) {
    return null;
  }

  return { user, pass, host, port };
}

function getFromAddress(): string {
  return (
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "elitebodyfitnesspros7@gmail.com"
  );
}

function getOwnerEmail(): string {
  return (
    process.env.OWNER_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "elitebodyfitnesspros7@gmail.com"
  );
}

function getTransporter() {
  const config = getSmtpConfig();
  if (!config) return null;

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

function buildOwnerText(payload: PurchaseEmailPayload): string {
  const lines = [
    "New package purchase — Elite Body Fitness Pros",
    "",
    `Package: ${payload.planName} (${payload.planId})`,
    `Amount paid: $${payload.amountTotalUsd} USD`,
    `Discount code: ${payload.discountCode || "None"}`,
    payload.freeTeeIncluded
      ? "Platinum bonus: Free workout t-shirt included."
      : "",
    "",
    "Customer details:",
    `Name: ${payload.customerName}`,
    `Email: ${payload.customerEmail}`,
    `Phone: ${payload.customerPhone || "Not provided"}`,
    "",
    `Stripe session: ${payload.stripeSessionId}`,
  ];
  return lines.filter(Boolean).join("\n");
}

function buildCustomerText(payload: PurchaseEmailPayload): string {
  return [
    `Hi ${payload.customerName || "there"},`,
    "",
    "Thank you for your purchase with Elite Body Fitness Pros!",
    "",
    `Package: ${payload.planName}`,
    `Amount paid: $${payload.amountTotalUsd} USD`,
    payload.freeTeeIncluded
      ? "Your Platinum package includes a free workout t-shirt — our team will follow up with next steps."
      : "Our coaching team will contact you shortly with next steps for your program.",
    "",
    "If you have questions, reply to this email or contact us at art@elitebodyfitnesspros.com.",
    "",
    "— Elite Body Fitness Pros",
  ].join("\n");
}

function buildOwnerHtml(payload: PurchaseEmailPayload): string {
  const tee = payload.freeTeeIncluded
    ? "<p><strong>Platinum bonus:</strong> Free workout t-shirt included.</p>"
    : "";
  return `
    <h2>New package purchase</h2>
    <p><strong>Package:</strong> ${escapeHtml(payload.planName)} (${escapeHtml(payload.planId)})</p>
    <p><strong>Amount paid:</strong> $${escapeHtml(payload.amountTotalUsd)} USD</p>
    <p><strong>Discount code:</strong> ${escapeHtml(payload.discountCode || "None")}</p>
    ${tee}
    <h3>Customer</h3>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(payload.customerName)}</li>
      <li><strong>Email:</strong> ${escapeHtml(payload.customerEmail)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(payload.customerPhone || "Not provided")}</li>
    </ul>
    <p style="color:#666;font-size:12px;">Stripe session: ${escapeHtml(payload.stripeSessionId)}</p>
  `;
}

function buildCustomerHtml(payload: PurchaseEmailPayload): string {
  const nextSteps = payload.freeTeeIncluded
    ? "Your Platinum package includes a <strong>free workout t-shirt</strong>. Our team will follow up with sizing and delivery details."
    : "Our coaching team will contact you shortly with next steps for your program.";
  return `
    <p>Hi ${escapeHtml(payload.customerName || "there")},</p>
    <p><strong>Thank you for your purchase</strong> with Elite Body Fitness Pros!</p>
    <p><strong>Package:</strong> ${escapeHtml(payload.planName)}<br/>
    <strong>Amount paid:</strong> $${escapeHtml(payload.amountTotalUsd)} USD</p>
    <p>${nextSteps}</p>
    <p>Questions? Reply to this email or write to <a href="mailto:art@elitebodyfitnesspros.com">art@elitebodyfitnesspros.com</a>.</p>
    <p>— Elite Body Fitness Pros</p>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendPurchaseEmails(
  payload: PurchaseEmailPayload
): Promise<{ ownerSent: boolean; customerSent: boolean }> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP not configured; skipping purchase emails.");
    return { ownerSent: false, customerSent: false };
  }

  const from = getFromAddress();
  const ownerEmail = getOwnerEmail();
  let ownerSent = false;
  let customerSent = false;

  try {
    await transporter.sendMail({
      from: `"Elite Body Fitness Pros" <${from}>`,
      to: ownerEmail,
      subject: `New purchase: ${payload.planName} — ${payload.customerName}`,
      text: buildOwnerText(payload),
      html: buildOwnerHtml(payload),
    });
    ownerSent = true;
  } catch (error) {
    console.error("owner purchase email failed", error);
  }

  if (payload.customerEmail) {
    try {
      await transporter.sendMail({
        from: `"Elite Body Fitness Pros" <${from}>`,
        to: payload.customerEmail,
        subject: "Thank you for your purchase — Elite Body Fitness Pros",
        text: buildCustomerText(payload),
        html: buildCustomerHtml(payload),
      });
      customerSent = true;
    } catch (error) {
      console.error("customer purchase email failed", error);
    }
  }

  return { ownerSent, customerSent };
}
