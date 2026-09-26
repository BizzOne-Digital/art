"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { PageContent, PageSection } from "@/lib/types";
import { ImageField } from "@/components/admin/ImageField";

export default function AdminPageEditor() {
  const params = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/pages/${params.slug}`)
      .then((r) => r.json())
      .then(setPage)
      .catch(() => setMessage("Failed to load page"));
  }, [params.slug]);

  function updateSection(id: string, patch: Partial<PageSection>) {
    if (!page) return;
    setPage({
      ...page,
      sections: page.sections.map((s) =>
        s.id === id ? { ...s, ...patch } : s
      ),
    });
  }

  async function save() {
    if (!page) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(page),
    });
    setSaving(false);
    setMessage(res.ok ? "Saved successfully" : "Save failed");
  }

  if (!page) {
    return <p className="text-[var(--muted)]">Loading page...</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/pages"
            className="text-xs uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--neon)]"
          >
            ← All Pages
          </Link>
          <h1 className="font-display mt-2 text-5xl tracking-[0.05em]">
            {page.name}
          </h1>
        </div>
        <button type="button" onClick={save} className="glow-btn" disabled={saving}>
          {saving ? "Saving..." : "Save Page"}
        </button>
      </div>
      {message && (
        <p className="mt-3 text-sm text-[var(--neon)]">{message}</p>
      )}

      <div className="mt-8 space-y-6">
        {page.sections.map((section) => (
          <div
            key={section.id}
            className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--neon)]">
              Section: {section.key}
            </p>
            <div className="grid gap-4">
              <label>
                <span className="admin-label">Title</span>
                <input
                  className="admin-input"
                  value={section.title}
                  onChange={(e) =>
                    updateSection(section.id, { title: e.target.value })
                  }
                />
              </label>
              <label>
                <span className="admin-label">Subtitle</span>
                <input
                  className="admin-input"
                  value={section.subtitle || ""}
                  onChange={(e) =>
                    updateSection(section.id, { subtitle: e.target.value })
                  }
                />
              </label>
              <label>
                <span className="admin-label">Body</span>
                <textarea
                  className="admin-input min-h-28"
                  value={section.body || ""}
                  onChange={(e) =>
                    updateSection(section.id, { body: e.target.value })
                  }
                />
              </label>
              <ImageField
                label="Section Image"
                value={section.image || ""}
                onChange={(url) => updateSection(section.id, { image: url })}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="admin-label">CTA Text</span>
                  <input
                    className="admin-input"
                    value={section.ctaText || ""}
                    onChange={(e) =>
                      updateSection(section.id, { ctaText: e.target.value })
                    }
                  />
                </label>
                <label>
                  <span className="admin-label">CTA Link</span>
                  <input
                    className="admin-input"
                    value={section.ctaLink || ""}
                    onChange={(e) =>
                      updateSection(section.id, { ctaLink: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
