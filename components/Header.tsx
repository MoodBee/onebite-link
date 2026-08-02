import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-border-subtle bg-surface/80 px-6 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <span
          aria-hidden
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-sm shadow-sm shadow-indigo-500/30"
        >
          🔗
        </span>
        <span className="text-lg font-bold tracking-tight text-foreground">
          한입 링크
        </span>
      </Link>
      <Link
        href="/new"
        className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-accent px-4 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition-all hover:bg-accent-hover hover:shadow-md hover:shadow-indigo-500/30 active:scale-95"
      >
        <span aria-hidden className="text-base leading-none">
          +
        </span>
        <span>새 링크</span>
      </Link>
    </header>
  );
}
