"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  linkSlug: string;
  linkText: string;
};

export default function NavLink({ linkSlug, linkText }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === linkSlug;

  return (
    <Link href={linkSlug}>
      <p className={cn({ "underline underline-offset-4": isActive })}>
        {linkText}
      </p>
    </Link>
  );
}
