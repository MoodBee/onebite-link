import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/[.08] px-6 dark:border-white/[.145]">
      <Link href="/" className="text-xl font-bold text-foreground">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex h-10 items-center justify-center gap-1 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        <span aria-hidden>+</span>
        <span>새 링크</span>
      </Link>
    </header>
  );
}
