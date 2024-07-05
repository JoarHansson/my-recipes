import NavLink from "@/components/ui/nav-link";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-border bg-background p-4">
      <div className="flex gap-4">
        <NavLink linkSlug="/" linkText="Home" />
        <NavLink linkSlug="/recipes" linkText="Recipes" />
        <NavLink linkSlug="/account" linkText="Account" />
      </div>
      <ModeToggle />
    </nav>
  );
}
