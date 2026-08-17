"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFolders } from "@/lib/folder-context";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import EditFolderModal from "@/components/EditFolderModal";

export type Folder = {
  id: string;
  name: string;
  count: number;
};

type FolderListProps = {
  folders: Folder[];
};

function PencilIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className="h-3.5 w-3.5"
    >
      <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className="h-3.5 w-3.5"
    >
      <path
        fillRule="evenodd"
        d="M8.75 1A1.75 1.75 0 0 0 7 2.75V3H4.25a.75.75 0 0 0 0 1.5h.3l.815 10.6A2.75 2.75 0 0 0 8.107 17.5h3.786a2.75 2.75 0 0 0 2.742-2.4L15.45 4.5h.3a.75.75 0 0 0 0-1.5H13v-.25A1.75 1.75 0 0 0 11.25 1h-2.5ZM8.5 2.75a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V3h-3v-.25ZM6.056 4.5h7.888l-.798 10.375a1.25 1.25 0 0 1-1.246 1.125H8.107a1.25 1.25 0 0 1-1.246-1.125L6.056 4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function FolderList({ folders }: FolderListProps) {
  const pathname = usePathname();
  const { removeFolder, renameFolder } = useFolders();
  const [pendingDelete, setPendingDelete] = useState<Folder | null>(null);
  const [pendingEdit, setPendingEdit] = useState<Folder | null>(null);

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    removeFolder(pendingDelete.id);
    setPendingDelete(null);
  }

  function handleSaveEdit(name: string) {
    if (!pendingEdit) return;
    renameFolder(pendingEdit.id, name);
    setPendingEdit(null);
  }

  return (
    <>
      <ul className="flex flex-col gap-1">
        {folders.map((folder) => {
          const isActive = pathname === `/folder/${folder.id}`;
          return (
            <li key={folder.id} className="group relative">
              <Link
                href={`/folder/${folder.id}`}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-accent-soft font-medium text-accent"
                    : "text-foreground hover:bg-black/[.04] dark:hover:bg-white/[.08]"
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span aria-hidden>📁</span>
                  {folder.name}
                </span>
                <span
                  className={`text-xs transition-opacity group-hover:opacity-0 ${
                    isActive
                      ? "text-accent"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {folder.count}
                </span>
              </Link>
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setPendingEdit(folder);
                  }}
                  aria-label={`${folder.name} 폴더 이름 수정`}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 hover:bg-black/[.06] hover:text-accent dark:text-zinc-500 dark:hover:bg-white/[.1]"
                >
                  <PencilIcon />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setPendingDelete(folder);
                  }}
                  aria-label={`${folder.name} 폴더 삭제`}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 hover:bg-black/[.06] hover:text-red-500 dark:text-zinc-500 dark:hover:bg-white/[.1]"
                >
                  <TrashIcon />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <EditFolderModal
        key={pendingEdit?.id ?? "closed"}
        folder={pendingEdit}
        onCancel={() => setPendingEdit(null)}
        onSave={handleSaveEdit}
      />

      <DeleteFolderModal
        folder={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
