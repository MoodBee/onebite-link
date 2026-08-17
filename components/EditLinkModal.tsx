"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { LinkItem } from "@/components/LinkCard";
import type { Folder } from "@/components/FolderList";

type EditLinkModalProps = {
  link: LinkItem | null;
  folders: Folder[];
  onCancel: () => void;
  onSave: (updates: {
    title: string;
    description: string;
    folderId: string;
  }) => void;
};

const inputClass =
  "w-full rounded-lg border border-border-subtle bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent-soft";

export default function EditLinkModal({
  link,
  folders,
  onCancel,
  onSave,
}: EditLinkModalProps) {
  const [folderId, setFolderId] = useState(link?.folderId ?? folders[0]?.id ?? "");
  const [title, setTitle] = useState(link?.title ?? "");
  const [description, setDescription] = useState(link?.description ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!link) return null;

  const isValid = title.trim() !== "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;
    onSave({ title: title.trim(), description: description.trim(), folderId });
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
      onClick={onCancel}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-border-subtle bg-surface p-6 shadow-xl"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-foreground">
            링크 정보 수정
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            폴더, 제목, 설명을 수정할 수 있어요
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="link-edit-folder"
            className="text-sm font-medium text-foreground"
          >
            폴더
          </label>
          <select
            id="link-edit-folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className={inputClass}
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="link-edit-title"
            className="text-sm font-medium text-foreground"
          >
            제목
          </label>
          <input
            ref={inputRef}
            id="link-edit-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="link-edit-description"
            className="text-sm font-medium text-foreground"
          >
            설명
          </label>
          <textarea
            id="link-edit-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
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
