import type { Folder } from "@/components/FolderList";
import type { LinkItem } from "@/components/LinkCard";

export const folders: Folder[] = [
  { id: "1", name: "개발", count: 12 },
  { id: "2", name: "디자인", count: 5 },
  { id: "3", name: "읽을거리", count: 8 },
];

export const links: LinkItem[] = [
  {
    id: "1",
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    folderId: "1",
  },
  {
    id: "2",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    folderId: "1",
  },
  {
    id: "3",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    folderId: "2",
  },
  {
    id: "4",
    title: "React 공식 문서",
    url: "https://react.dev",
    folderId: "1",
  },
  { id: "5", title: "GitHub", url: "https://github.com", folderId: "3" },
  { id: "6", title: "Figma", url: "https://figma.com", folderId: "2" },
];
