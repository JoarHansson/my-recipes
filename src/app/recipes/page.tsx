import Link from "next/link";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function Recipes() {
  const recipes = await prisma.recipe.findMany();

  return (
    <>
      {recipes.map((recipe) => {
        return (
          <div key={recipe.id}>
            <Link className="underline" href={`/recipes/${recipe.id}`}>
              {recipe.title}
            </Link>
          </div>
        );
      })}
      <Link href="/recipes/new">
        <Button className="mt-4">New recipe</Button>
      </Link>
    </>
  );
}
