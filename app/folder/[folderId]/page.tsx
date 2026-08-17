import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FolderLinkGrid from "@/components/FolderLinkGrid";
import { folders } from "@/lib/mock-data";

type FolderPageProps = {
  params: Promise<{ folderId: string }>;
};

export default async function FolderPage({ params }: FolderPageProps) {
  const { folderId } = await params;
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <FolderLinkGrid folderId={folderId} folderName={folder.name} />
        </main>
      </div>
    </div>
  );
}
