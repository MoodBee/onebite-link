"use client";

import type { Folder } from "@/components/FolderList";

type DeleteFolderModalProps = {
  folder: Folder | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteFolderModal({
  folder,
  onCancel,
  onConfirm,
}: DeleteFolderModalProps) {
  if (!folder) return null;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
      onClick={onCancel}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-border-subtle bg-surface p-6 shadow-xl"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-foreground">
            폴더를 삭제할까요?
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-medium text-foreground">
              {folder.name}
            </span>{" "}
            폴더를 삭제하면 되돌릴 수 없어요.
          </p>
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
            type="button"
            onClick={onConfirm}
            className="flex h-10 items-center justify-center rounded-full bg-red-500 px-4 text-sm font-medium text-white shadow-sm shadow-red-500/25 transition-all hover:bg-red-600 hover:shadow-md hover:shadow-red-500/30 active:scale-95"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
