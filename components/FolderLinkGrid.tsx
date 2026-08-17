"use client";

import LinkGrid from "@/components/LinkGrid";
import { useLinks } from "@/lib/link-context";

type FolderLinkGridProps = {
  folderId: string;
  folderName: string;
};

export default function FolderLinkGrid({
  folderId,
  folderName,
}: FolderLinkGridProps) {
  const { links } = useLinks();
  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <>
      <div className="mb-4 flex items-baseline gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          {folderName}
        </h2>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {folderLinks.length}개
        </span>
      </div>
      <LinkGrid links={folderLinks} />
    </>
  );
}
