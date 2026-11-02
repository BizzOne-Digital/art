"use client";

import { useEffect, useState } from "react";
import type { GalleryItem } from "@/lib/types";
import { ImageField } from "@/components/admin/ImageField";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [draft, setDraft] = useState({
    title: "",
    category: "Training",
    image: "",
  });
  const [editing, setEditing] = useState<GalleryItem | null>(null);

  async function load() {
    const res = await fetch("/api/gallery");
    setItems(await res.json());
  }

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/gallery")
      .then((res) => res.json())
      .then((data: GalleryItem[]) => {
        if (!cancelled) setItems(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function save() {
    const payload = editing ? { ...editing, ...draft } : draft;
    await fetch("/api/gallery", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setEditing(null);
    setDraft({ title: "", category: "Training", image: "" });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this gallery image?")) return;
    await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-5xl tracking-[0.05em]">Gallery</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Add, edit, or replace gallery images.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5">
          <h2 className="font-display text-3xl tracking-[0.05em]">
            {editing ? "Edit Image" : "Add Image"}
          </h2>
          <div className="mt-4 grid gap-4">
            <label>
              <span className="admin-label">Title</span>
              <input
                className="admin-input"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </label>
            <label>
              <span className="admin-label">Category</span>
              <input
                className="admin-input"
                value={draft.category}
                onChange={(e) =>
                  setDraft({ ...draft, category: e.target.value })
                }
              />
            </label>
            <ImageField
              label="Image"
              value={draft.image}
              onChange={(url) => setDraft({ ...draft, image: url })}
            />
            <button type="button" className="glow-btn" onClick={save}>
              Save
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-[var(--line)] bg-[var(--bg-elevated)] p-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="aspect-[3/4] w-full object-cover"
              />
              <p className="font-display mt-2 text-xl tracking-[0.04em]">
                {item.title}
              </p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                {item.category}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="ghost-btn !px-3 !py-1 text-[10px]"
                  onClick={() => {
                    setEditing(item);
                    setDraft({
                      title: item.title,
                      category: item.category,
                      image: item.image,
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="ghost-btn !border-[var(--danger)] !px-3 !py-1 !text-[var(--danger)] text-[10px]"
                  onClick={() => remove(item.id)}
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
