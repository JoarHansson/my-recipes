import { Typography } from "@/components/ui/typography";
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
    <>
      <Typography variant={"h2"}>{recipe?.title}</Typography>

      <Typography variant={"ul"}>
        {ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient.name}</li>;
        })}
      </Typography>

      <Typography variant={"ol"}>
        {instructions.map((instruction, index) => {
          return <li key={index}>{instruction.name}</li>;
        })}
      </Typography>
    </>
  );
}
