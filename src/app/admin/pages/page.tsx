import Link from "next/link";
import { getSiteData } from "@/lib/data";

export default async function AdminPagesList() {
  const data = await getSiteData();

  return (
    <div>
      <h1 className="font-display text-5xl tracking-[0.05em]">Pages</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Edit content and images for each page, section by section.
      </p>

      <div className="mt-8 grid gap-3">
        {data.pages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            className="flex items-center justify-between border border-[var(--line)] bg-[var(--bg-elevated)] px-5 py-4 transition hover:border-[var(--neon)]"
          >
            <div>
              <p className="font-display text-2xl tracking-[0.05em]">
                {page.name}
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                /{page.slug === "home" ? "" : page.slug} · {page.sections.length}{" "}
                sections
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.14em] text-[var(--neon)]">
              Edit →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
