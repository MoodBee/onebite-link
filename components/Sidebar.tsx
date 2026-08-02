"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FolderList, { type Folder } from "@/components/FolderList";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  const pathname = usePathname();
  const isAllActive = pathname === "/";
  const total = folders.reduce((sum, folder) => sum + folder.count, 0);

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-4 border-r border-border-subtle p-4">
      <Link
        href="/"
        className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
          isAllActive
            ? "bg-accent-soft text-accent"
            : "text-foreground hover:bg-black/[.04] dark:hover:bg-white/[.08]"
        }`}
      >
        <span className="flex items-center gap-2">
          <span aria-hidden>🔖</span>
          전체
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {total}
        </span>
      </Link>
      <div className="flex flex-col gap-1">
        <p className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          폴더
        </p>
        <FolderList folders={folders} />
      </div>
    </aside>
  );
}
