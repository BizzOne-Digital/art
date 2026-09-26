"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Invalid username or password");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-[var(--line)] bg-[var(--bg-elevated)] p-8"
      >
        <Logo />
        <h1 className="font-display mt-6 text-4xl tracking-[0.06em]">
          Admin Login
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Manage pages, products, gallery, FAQs & orders.
        </p>

        <label className="mt-8 block">
          <span className="admin-label">Username</span>
          <input name="username" required className="admin-input" defaultValue="admin" />
        </label>
        <label className="mt-4 block">
          <span className="admin-label">Password</span>
          <input
            name="password"
            type="password"
            required
            className="admin-input"
          />
        </label>

        {error && <p className="mt-3 text-sm text-[var(--danger)]">{error}</p>}

        <button type="submit" className="glow-btn mt-6 w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
