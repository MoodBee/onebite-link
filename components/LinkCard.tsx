"use client";

import { useState } from "react";

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  folderId: string;
  description?: string;
  thumbnail?: string | null;
};

type LinkCardProps = {
  link: LinkItem;
};

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinkCard({ link }: LinkCardProps) {
  const domain = getDomain(link.url);
  const [faviconFailed, setFaviconFailed] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const showThumbnail = Boolean(link.thumbnail) && !thumbnailFailed;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-black/[.06] dark:hover:shadow-black/30"
    >
      <div className="flex h-24 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500/10 to-violet-500/10">
        {showThumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail ?? undefined}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            onError={() => setThumbnailFailed(true)}
          />
        ) : faviconFailed ? (
          <span aria-hidden className="text-2xl">
            🔗
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
            alt=""
            aria-hidden
            width={32}
            height={32}
            className="h-8 w-8"
            onError={() => setFaviconFailed(true)}
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-medium text-foreground group-hover:text-accent">
          {link.title}
        </p>
        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
          {domain}
        </p>
      </div>
    </a>
  );
}
