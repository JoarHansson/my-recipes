import prisma from "@/lib/db";
import Link from "next/link";

export default async function Recipes() {
  const recipes = await prisma.recipe.findMany();

  return (
    <>
      {recipes.map((recipe) => {
        return (
          <div>
            <Link className="underline" href={`/recipes/${recipe.id}`}>
              {recipe.title}
            </Link>
          </div>
        );
      })}
    </>
  );
}
