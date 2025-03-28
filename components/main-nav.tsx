"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/" ? "text-primary" : "text-muted-foreground")}>
        Home
      </Link>
      <Link
        href="/provider"
        className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/provider" ? "text-primary" : "text-muted-foreground")}
      >
        Provider Dashboard
      </Link>
      <Link
        href="/carronbridge"
        className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/carronbridge" ? "text-primary" : "text-muted-foreground")}
      >
        Carronbridge Jobs
      </Link>
    </nav>
  );
}
