"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

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

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      type: inquiryProduct ? "product_inquiry" : defaultType,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
      service: String(form.get("service") || ""),
      preferredDate: String(form.get("preferredDate") || ""),
      productName: inquiryProduct,
      productId: inquiryProductId,
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
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
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
          defaultValue={
            inquiryProduct
              ? `Hi, I'd like to inquire about the price for ${inquiryProduct}.`
              : ""
          }
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
