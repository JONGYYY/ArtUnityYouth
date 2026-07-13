'use client';

import { useState } from 'react';

type Props = {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  single?: boolean;
};

export default function ImageUploader({ label, value, onChange, single = false }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const addUrls = (urls: string[]) => {
    if (single) onChange(urls.slice(-1));
    else onChange([...value, ...urls]);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Upload failed');
        uploaded.push(data.url);
      }
      addUrls(uploaded);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeAt = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <label className="font-body text-sm font-semibold text-ink/80">{label}</label>

      {value.length > 0 && (
        <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {value.map((src, i) => (
            <div key={`${src}-${i}`} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full aspect-square object-cover rounded-sm border border-ink/10 bg-parch"
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-1 right-1 bg-ink/80 text-cream rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 cursor-pointer rounded-sm border border-ink/20 px-4 py-2 font-body text-sm hover:border-rust hover:text-rust transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple={!single}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {uploading ? 'Uploading…' : single ? 'Upload image' : 'Upload image(s)'}
        </label>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="…or paste an image path/URL"
            className="rounded-sm border-ink/20 text-sm py-2"
          />
          <button
            type="button"
            onClick={() => {
              if (urlInput.trim()) {
                addUrls([urlInput.trim()]);
                setUrlInput('');
              }
            }}
            className="rounded-sm border border-ink/20 px-3 py-2 font-body text-sm hover:border-rust hover:text-rust transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {error && <p className="mt-2 text-rust text-sm">{error}</p>}
    </div>
  );
}
