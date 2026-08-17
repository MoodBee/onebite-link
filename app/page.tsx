import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { links } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-4 flex items-baseline gap-2">
            <h2 className="text-lg font-semibold text-foreground">전체 링크</h2>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {links.length}개
            </span>
          </div>
          <LinkGrid links={links} />
        </main>
      </div>
    </div>
  );
}
