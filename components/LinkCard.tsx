export type LinkItem = {
  id: string;
  title: string;
  url: string;
  folderId: string;
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
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 rounded-xl border border-black/[.08] p-4 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
    >
      <div className="flex h-24 items-center justify-center rounded-lg bg-black/[.04] text-2xl dark:bg-white/[.08]">
        <span aria-hidden>🔗</span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-medium text-foreground">
          {link.title}
        </p>
        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
          {getDomain(link.url)}
        </p>
      </div>
    </a>
  );
}
