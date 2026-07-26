"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { ImageField } from "@/components/admin/ImageField";

const empty: Omit<Product, "id"> = {
  name: "",
  description: "",
  category: "Equipment",
  image: "",
  featured: false,
  active: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [draft, setDraft] = useState(empty);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/products?all=1");
    setProducts(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  function startCreate() {
    setEditing(null);
    setDraft(empty);
  }

  function startEdit(p: Product) {
    setEditing(p);
    setDraft({
      name: p.name,
      description: p.description,
      category: p.category,
      image: p.image,
      featured: p.featured,
      active: p.active,
    });
  }

  async function save() {
    const payload = editing ? { ...editing, ...draft } : draft;
    const res = await fetch("/api/products", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setMessage("Product saved");
      setEditing(null);
      setDraft(empty);
      load();
    } else {
      setMessage("Save failed");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl tracking-[0.05em]">Products</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Prices show as “Inquire for Price” on the site.
          </p>
        </div>
        <button type="button" className="glow-btn" onClick={startCreate}>
          Add Product
        </button>
      </div>
      {message && <p className="mt-3 text-sm text-[var(--neon)]">{message}</p>}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5">
          <h2 className="font-display text-3xl tracking-[0.05em]">
            {editing ? "Edit Product" : "New Product"}
          </h2>
          <div className="mt-4 grid gap-4">
            <label>
              <span className="admin-label">Name</span>
              <input
                className="admin-input"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
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
            <label>
              <span className="admin-label">Description</span>
              <textarea
                className="admin-input min-h-24"
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
              />
            </label>
            <ImageField
              label="Product Image"
              value={draft.image}
              onChange={(url) => setDraft({ ...draft, image: url })}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(e) =>
                  setDraft({ ...draft, featured: e.target.checked })
                }
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.active}
                onChange={(e) =>
                  setDraft({ ...draft, active: e.target.checked })
                }
              />
              Active
            </label>
            <button type="button" className="glow-btn" onClick={save}>
              Save Product
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex gap-4 border border-[var(--line)] bg-[var(--bg-elevated)] p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt=""
                className="h-20 w-20 object-cover border border-[var(--line)]"
              />
              <div className="flex-1">
                <p className="font-display text-2xl tracking-[0.04em]">
                  {p.name}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                  {p.category} · {p.active ? "Active" : "Hidden"}
                  {p.featured ? " · Featured" : ""}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="ghost-btn !px-3 !py-1 text-[10px]"
                    onClick={() => startEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="ghost-btn !border-[var(--danger)] !px-3 !py-1 !text-[var(--danger)] text-[10px]"
                    onClick={() => remove(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
