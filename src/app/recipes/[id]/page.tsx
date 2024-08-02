import prisma from "@/lib/db";
import { Ingredient, Instruction } from "@/lib/types";

export default async function Recipe({ params }: { params: { id: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
  });

  const ingredients: Ingredient[] = JSON.parse(recipe?.ingredients || "[]");
  const instructions: Instruction[] = JSON.parse(recipe?.instructions || "[]");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="underline">{recipe?.title}</h1>
      <ul className="list-disc">
        {ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient.name}</li>;
        })}
      </ul>
      <ol className="list-decimal">
        {instructions.map((instruction, index) => {
          return <li key={index}>{instruction.name}</li>;
        })}
      </ol>
    </div>
  );
}
