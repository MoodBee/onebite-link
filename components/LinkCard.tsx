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
  onRequestDelete?: (link: LinkItem) => void;
};

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className="h-3.5 w-3.5"
    >
      <path
        fillRule="evenodd"
        d="M8.75 1A1.75 1.75 0 0 0 7 2.75V3H4.25a.75.75 0 0 0 0 1.5h.3l.815 10.6A2.75 2.75 0 0 0 8.107 17.5h3.786a2.75 2.75 0 0 0 2.742-2.4L15.45 4.5h.3a.75.75 0 0 0 0-1.5H13v-.25A1.75 1.75 0 0 0 11.25 1h-2.5ZM8.5 2.75a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V3h-3v-.25ZM6.056 4.5h7.888l-.798 10.375a1.25 1.25 0 0 1-1.246 1.125H8.107a1.25 1.25 0 0 1-1.246-1.125L6.056 4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function LinkCard({ link, onRequestDelete }: LinkCardProps) {
  const domain = getDomain(link.url);
  const [faviconFailed, setFaviconFailed] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const showThumbnail = Boolean(link.thumbnail) && !thumbnailFailed;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-black/[.06] dark:hover:shadow-black/30"
    >
      {onRequestDelete && (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRequestDelete(link);
          }}
          aria-label={`${link.title} 링크 삭제`}
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-zinc-500 opacity-0 shadow-sm backdrop-blur-sm transition-opacity hover:text-red-500 group-hover:opacity-100 dark:bg-zinc-900/90 dark:text-zinc-400"
        >
          <TrashIcon />
        </button>
      )}
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
