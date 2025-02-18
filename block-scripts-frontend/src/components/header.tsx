import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center">
          <div>
            <span className="text-2xl font-bold">
              Script Analysis Dashboard
            </span>
          </div>
          <div>
            <nav className="ml-6 flex items-center gap-x-6 text-sm font-medium">
              <Link
                href="/dashboard/script-review/queue"
                className="transition-colors hover:text-foreground/80"
              >
                Queue
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
