"use client";

import { useState } from "react";
import LinkCard, { type LinkItem } from "@/components/LinkCard";
import DeleteLinkModal from "@/components/DeleteLinkModal";
import EditLinkModal from "@/components/EditLinkModal";
import { useLinks } from "@/lib/link-context";
import { useFolders } from "@/lib/folder-context";

type LinkGridProps = {
  links: LinkItem[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  const { removeLink, updateLink } = useLinks();
  const { folders } = useFolders();
  const [pendingDelete, setPendingDelete] = useState<LinkItem | null>(null);
  const [pendingEdit, setPendingEdit] = useState<LinkItem | null>(null);

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    removeLink(pendingDelete.id);
    setPendingDelete(null);
  }

  function handleSaveEdit(updates: {
    title: string;
    description: string;
    folderId: string;
  }) {
    if (!pendingEdit) return;
    updateLink(pendingEdit.id, updates);
    setPendingEdit(null);
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
          <LinkCard
            key={link.id}
            link={link}
            onRequestEdit={setPendingEdit}
            onRequestDelete={setPendingDelete}
          />
        ))}
      </div>

      <EditLinkModal
        key={pendingEdit?.id ?? "closed"}
        link={pendingEdit}
        folders={folders}
        onCancel={() => setPendingEdit(null)}
        onSave={handleSaveEdit}
      />

      <DeleteLinkModal
        link={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
