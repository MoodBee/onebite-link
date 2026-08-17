"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/lib/folder-context";
import { useLinks } from "@/lib/link-context";
import type { OpenGraphData } from "@/lib/og";

const inputClass =
  "w-full rounded-lg border border-border-subtle bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent-soft";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = url.trim() !== "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid || isSaving) return;

    const trimmedUrl = url.trim();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/og?url=${encodeURIComponent(trimmedUrl)}`,
      );

      if (!response.ok) {
        throw new Error("올바른 링크 주소인지 확인해주세요.");
      }

      const og: OpenGraphData = await response.json();

      addLink({
        title: og.title,
        url: og.url,
        description: og.description,
        thumbnail: og.thumbnail,
        folderId,
      });

      router.push("/");
    } catch {
      setError("링크 정보를 가져오지 못했어요. 잠시 후 다시 시도해주세요.");
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-foreground">
          새 링크 저장하기
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          저장할 링크 주소와 폴더를 선택해주세요
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className="text-sm font-medium text-foreground">
          링크
        </label>
        <input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          disabled={isSaving}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-foreground"
        >
          폴더
        </label>
        <select
          id="folder"
          value={folderId}
          onChange={(event) => setFolderId(event.target.value)}
          disabled={isSaving}
          className={inputClass}
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={!isValid || isSaving}
        className="flex h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition-all hover:bg-accent-hover hover:shadow-md hover:shadow-indigo-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:scale-100"
      >
        {isSaving ? "가져오는 중..." : "저장"}
      </button>
    </form>
  );
}
