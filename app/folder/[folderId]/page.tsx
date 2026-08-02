import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "@/lib/mock-data";

type FolderPageProps = {
  params: Promise<{ folderId: string }>;
};

export default async function FolderPage({ params }: FolderPageProps) {
  const { folderId } = await params;
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} />
        <main className="flex-1 p-6">
          <div className="mb-4 flex items-baseline gap-2">
            <h2 className="text-lg font-semibold text-foreground">
              {folder.name}
            </h2>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {folderLinks.length}개
            </span>
          </div>
          <LinkGrid links={folderLinks} />
        </main>
      </div>
    </div>
  );
}
