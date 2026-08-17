"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Folder } from "@/components/FolderList";

type EditFolderModalProps = {
  folder: Folder | null;
  onCancel: () => void;
  onSave: (name: string) => void;
};

export default function EditFolderModal({
  folder,
  onCancel,
  onSave,
}: EditFolderModalProps) {
  const [name, setName] = useState(folder?.name ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!folder) return null;

  const isValid = name.trim() !== "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;
    onSave(name.trim());
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
      onClick={onCancel}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-border-subtle bg-surface p-6 shadow-xl"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-foreground">
            폴더 이름 수정
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            새 폴더 이름을 입력해주세요
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="folder-edit-name"
            className="text-sm font-medium text-foreground"
          >
            폴더 이름
          </label>
          <input
            ref={inputRef}
            id="folder-edit-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent-soft"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 items-center justify-center rounded-full border border-border-subtle px-4 text-sm font-medium text-foreground transition-colors hover:bg-black/[.04] dark:hover:bg-white/[.08]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="flex h-10 items-center justify-center rounded-full bg-accent px-4 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition-all hover:bg-accent-hover hover:shadow-md hover:shadow-indigo-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:scale-100"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
