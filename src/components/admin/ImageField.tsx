"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function onFile(file: File | null) {
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="admin-label">{label}</span>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className="admin-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or upload"
        />
        <label className="ghost-btn cursor-pointer !px-4 !py-2 text-xs">
          <Upload size={14} />
          {uploading ? "Uploading..." : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mt-3 h-28 w-full max-w-xs object-cover border border-[var(--line)]"
        />
      )}
    </div>
  );
}
