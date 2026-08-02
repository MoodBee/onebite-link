"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type Folder = {
  id: string;
  name: string;
  count: number;
};

type FolderListProps = {
  folders: Folder[];
};

export default function FolderList({ folders }: FolderListProps) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => {
        const isActive = pathname === `/folder/${folder.id}`;
        return (
          <li key={folder.id}>
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
                className={`text-xs ${
                  isActive
                    ? "text-accent"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {folder.count}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
