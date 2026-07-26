"use client";

import { useEffect, useState } from "react";
import type { FAQ } from "@/lib/types";

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [draft, setDraft] = useState({
    question: "",
    answer: "",
    order: 1,
  });
  const [editing, setEditing] = useState<FAQ | null>(null);

  async function load() {
    const res = await fetch("/api/faqs");
    setFaqs(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    const payload = editing ? { ...editing, ...draft } : draft;
    await fetch("/api/faqs", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setEditing(null);
    setDraft({ question: "", answer: "", order: faqs.length + 1 });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    await fetch("/api/faqs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-5xl tracking-[0.05em]">FAQs</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Create and edit frequently asked questions.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5">
          <h2 className="font-display text-3xl tracking-[0.05em]">
            {editing ? "Edit FAQ" : "New FAQ"}
          </h2>
          <div className="mt-4 grid gap-4">
            <label>
              <span className="admin-label">Question</span>
              <input
                className="admin-input"
                value={draft.question}
                onChange={(e) =>
                  setDraft({ ...draft, question: e.target.value })
                }
              />
            </label>
            <label>
              <span className="admin-label">Answer</span>
              <textarea
                className="admin-input min-h-28"
                value={draft.answer}
                onChange={(e) => setDraft({ ...draft, answer: e.target.value })}
              />
            </label>
            <label>
              <span className="admin-label">Order</span>
              <input
                type="number"
                className="admin-input"
                value={draft.order}
                onChange={(e) =>
                  setDraft({ ...draft, order: Number(e.target.value) })
                }
              />
            </label>
            <button type="button" className="glow-btn" onClick={save}>
              Save FAQ
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-[var(--line)] bg-[var(--bg-elevated)] p-4"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--neon)]">
                Order {faq.order}
              </p>
              <p className="font-display mt-1 text-2xl tracking-[0.04em]">
                {faq.question}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{faq.answer}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="ghost-btn !px-3 !py-1 text-[10px]"
                  onClick={() => {
                    setEditing(faq);
                    setDraft({
                      question: faq.question,
                      answer: faq.answer,
                      order: faq.order,
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="ghost-btn !border-[var(--danger)] !px-3 !py-1 !text-[var(--danger)] text-[10px]"
                  onClick={() => remove(faq.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
