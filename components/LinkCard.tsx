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
  onRequestEdit?: (link: LinkItem) => void;
  onRequestDelete?: (link: LinkItem) => void;
};

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function PencilIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className="h-3.5 w-3.5"
    >
      <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
    </svg>
  );
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

export default function LinkCard({
  link,
  onRequestEdit,
  onRequestDelete,
}: LinkCardProps) {
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
      {(onRequestEdit || onRequestDelete) && (
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {onRequestEdit && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onRequestEdit(link);
              }}
              aria-label={`${link.title} 링크 수정`}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-zinc-500 shadow-sm backdrop-blur-sm hover:text-accent dark:bg-zinc-900/90 dark:text-zinc-400"
            >
              <PencilIcon />
            </button>
          )}
          {onRequestDelete && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onRequestDelete(link);
              }}
              aria-label={`${link.title} 링크 삭제`}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-zinc-500 shadow-sm backdrop-blur-sm hover:text-red-500 dark:bg-zinc-900/90 dark:text-zinc-400"
            >
              <TrashIcon />
            </button>
          )}
        </div>
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
