import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FolderProvider } from "@/lib/folder-context";
import { LinkProvider } from "@/lib/link-context";
import { folders, links } from "@/lib/mock-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한입 링크",
  description: "한입에 저장하는 나만의 링크 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <FolderProvider initialFolders={folders}>
          <LinkProvider initialLinks={links}>{children}</LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
