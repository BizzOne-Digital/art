"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DISCOUNT_CODE, DISCOUNT_LABEL } from "@/lib/promotions";

export function ContactForm({
  defaultType = "contact",
  productName,
  productId,
  showService = false,
  showDate = false,
  submitLabel = "Send Message",
}: {
  defaultType?: "contact" | "product_inquiry";
  productName?: string;
  productId?: string;
  showService?: boolean;
  showDate?: boolean;
  submitLabel?: string;
}) {
  const params = useSearchParams();
  const inquiryProduct =
    productName || params.get("product") || undefined;
  const inquiryProductId =
    productId || params.get("productId") || undefined;
  const packageName = params.get("package") || "";
  const initialCode = params.get("code") || "";

  const defaultMessage = useMemo(() => {
    if (inquiryProduct) {
      return `Hi, I'd like to inquire about the price for ${inquiryProduct}.`;
    }
    if (packageName) {
      return `Hi, I'm interested in the ${packageName}.`;
    }
    return "";
  }, [inquiryProduct, packageName]);

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [discountCode, setDiscountCode] = useState(initialCode);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const enteredCode = String(form.get("discountCode") || "").trim();
    let message = String(form.get("message") || "");

    if (enteredCode) {
      const codeNote = `Discount code: ${enteredCode.toUpperCase()} (${DISCOUNT_LABEL}).`;
      message = message ? `${message}\n\n${codeNote}` : codeNote;
    }

    const payload = {
      type: inquiryProduct ? "product_inquiry" : defaultType,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message,
      service: String(form.get("service") || ""),
      preferredDate: String(form.get("preferredDate") || ""),
      productName: inquiryProduct,
      productId: inquiryProductId,
      discountCode: enteredCode || undefined,
      packageName: packageName || undefined,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      e.currentTarget.reset();
      setDiscountCode("");
    } catch {
      setStatus("error");
    }
  }

  const codeMatches =
    discountCode.trim().toUpperCase() === DISCOUNT_CODE.toUpperCase();

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {packageName && !inquiryProduct && (
        <div className="border border-[var(--line)] bg-[rgba(0,180,255,0.08)] px-4 py-3 text-sm text-[var(--neon)]">
          Package inquiry: <strong>{packageName}</strong>
        </div>
      )}

      {inquiryProduct && (
        <div className="border border-[var(--line)] bg-[rgba(0,180,255,0.08)] px-4 py-3 text-sm text-[var(--neon)]">
          Price inquiry for: <strong>{inquiryProduct}</strong>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="admin-label">Name</span>
          <input name="name" required className="admin-input" />
        </label>
        <label>
          <span className="admin-label">Email</span>
          <input name="email" type="email" required className="admin-input" />
        </label>
      </div>

      <label>
        <span className="admin-label">Phone</span>
        <input name="phone" className="admin-input" />
      </label>

      <label>
        <span className="admin-label">Discount Code (apply at checkout)</span>
        <input
          name="discountCode"
          className="admin-input uppercase tracking-[0.12em]"
          placeholder={DISCOUNT_CODE}
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        {codeMatches && (
          <span className="mt-2 block text-xs font-semibold text-[var(--gold)]">
            {DISCOUNT_LABEL} will be applied to your package.
          </span>
        )}
      </label>

      {showService && (
        <label>
          <span className="admin-label">Service</span>
          <select name="service" className="admin-input" defaultValue="">
            <option value="">Select a service</option>
            <option>Scientifically Designed Program Structure</option>
            <option>Strength Programming</option>
            <option>Nutritional Guidance</option>
          </select>
        </label>
      )}

      {showDate && (
        <label>
          <span className="admin-label">Preferred Date</span>
          <input name="preferredDate" type="date" className="admin-input" />
        </label>
      )}

      <label>
        <span className="admin-label">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="admin-input resize-y"
          defaultValue={defaultMessage}
          key={defaultMessage}
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="glow-btn w-full"
      >
        {status === "loading" ? "Sending..." : submitLabel}
      </button>

      {status === "done" && (
        <p className="text-sm text-[var(--neon)]">
          Message sent. We&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-[var(--danger)]">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
