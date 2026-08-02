import FolderList, { type Folder } from "@/components/FolderList";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  return (
    <aside className="flex w-56 shrink-0 flex-col gap-4 border-r border-black/[.08] p-4 dark:border-white/[.145]">
      <button className="flex items-center gap-2 rounded-md bg-black/[.04] px-3 py-2 text-left text-sm font-medium text-foreground dark:bg-white/[.08]">
        <span aria-hidden>🔖</span>
        전체
      </button>
      <FolderList folders={folders} />
    </aside>
  );
}
