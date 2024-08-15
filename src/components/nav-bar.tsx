import { ModeToggle } from "./mode-toggle";
import { Typography } from "./ui/typography";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-border bg-background py-4">
      <Link href={"/recipes"}>
        <Typography
          variant={"h3"}
          as="div"
          className="bg-primary px-2 font-extrabold uppercase text-primary-foreground"
        >
          My Recipes
        </Typography>
      </Link>
      <ModeToggle />
    </nav>
  );
}
