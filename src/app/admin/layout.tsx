import { AdminShell } from "@/components/admin/AdminShell";

/** Admin pages read MongoDB at request time — skip static prerender. */
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
