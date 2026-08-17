"use client";

import { useState } from "react";
import LinkCard, { type LinkItem } from "@/components/LinkCard";
import DeleteLinkModal from "@/components/DeleteLinkModal";
import { useLinks } from "@/lib/link-context";

type LinkGridProps = {
  links: LinkItem[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  const { removeLink } = useLinks();
  const [pendingDelete, setPendingDelete] = useState<LinkItem | null>(null);

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    removeLink(pendingDelete.id);
    setPendingDelete(null);
  }

  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-subtle py-24 text-center">
        <span aria-hidden className="text-3xl">
          🗂️
        </span>
        <p className="text-sm font-medium text-foreground">
          아직 저장된 링크가 없어요
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          새 링크 버튼을 눌러 첫 링크를 추가해보세요
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} onRequestDelete={setPendingDelete} />
        ))}
      </div>

      <DeleteLinkModal
        link={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
