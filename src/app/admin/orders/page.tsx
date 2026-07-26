"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/lib/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function load() {
    const res = await fetch("/api/orders");
    if (res.ok) setOrders(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: Order["status"]) {
    await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this order?")) return;
    await fetch("/api/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-5xl tracking-[0.05em]">Orders</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Product inquiries, bookings, and contact messages.
      </p>

      <div className="mt-8 space-y-4">
        {orders.length === 0 && (
          <p className="border border-[var(--line)] bg-[var(--bg-elevated)] p-6 text-sm text-[var(--muted)]">
            No orders yet.
          </p>
        )}
        {orders.map((order) => (
          <article
            key={order.id}
            className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--neon)]">
                  {order.type.replace("_", " ")} · {order.status}
                </p>
                <h2 className="font-display mt-1 text-3xl tracking-[0.04em]">
                  {order.name}
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {order.email}
                  {order.phone ? ` · ${order.phone}` : ""}
                </p>
              </div>
              <p className="text-xs text-[var(--muted)]">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            {order.productName && (
              <p className="mt-3 text-sm text-[var(--neon)]">
                Product: {order.productName}
              </p>
            )}
            {order.service && (
              <p className="mt-1 text-sm text-[var(--muted)]">
                Service: {order.service}
              </p>
            )}
            {order.preferredDate && (
              <p className="mt-1 text-sm text-[var(--muted)]">
                Preferred date: {order.preferredDate}
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed">{order.message}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(["new", "reviewed", "closed"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`ghost-btn !px-3 !py-1 text-[10px] ${
                    order.status === status ? "!bg-[rgba(184,255,46,0.12)]" : ""
                  }`}
                  onClick={() => setStatus(order.id, status)}
                >
                  {status}
                </button>
              ))}
              <button
                type="button"
                className="ghost-btn !border-[var(--danger)] !px-3 !py-1 !text-[var(--danger)] text-[10px]"
                onClick={() => remove(order.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
