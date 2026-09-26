import Link from "next/link";
import { getSiteData } from "@/lib/data";

export default async function AdminDashboard() {
  const data = await getSiteData();
  const newOrders = data.orders.filter((o) => o.status === "new").length;

  const cards = [
    { label: "Pages", value: data.pages.length, href: "/admin/pages" },
    { label: "Products", value: data.products.length, href: "/admin/products" },
    { label: "Gallery", value: data.gallery.length, href: "/admin/gallery" },
    { label: "Orders", value: data.orders.length, href: "/admin/orders" },
    { label: "New Orders", value: newOrders, href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="font-display text-5xl tracking-[0.05em]">Dashboard</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Welcome back. Manage Elite Body Fitness Pros content from here.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-[var(--line)] bg-[var(--bg-elevated)] p-6 transition hover:border-[var(--neon)]"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              {card.label}
            </p>
            <p className="font-display mt-3 text-5xl text-[var(--neon)]">
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-[var(--line)] bg-[var(--bg-elevated)] p-6">
        <h2 className="font-display text-3xl tracking-[0.05em]">
          Quick Tips
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
          <li>▸ Edit each page section title, body, and image under Pages.</li>
          <li>▸ Products always show “Inquire for Price” and send inquiries to Orders.</li>
          <li>▸ Gallery images can be added, edited, or removed anytime.</li>
          <li>▸ Packages, Training Programs, About, and Pricing content can be updated when the client provides finals.</li>
        </ul>
      </div>
    </div>
  );
}
