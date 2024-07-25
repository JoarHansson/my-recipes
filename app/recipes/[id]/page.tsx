import prisma from "@/lib/db";

export default async function Recipe({ params }: { params: { id: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
  });

  const ingredients: string[] = JSON.parse(recipe?.ingredients || "[]");
  const instructions: string[] = JSON.parse(recipe?.instructions || "[]");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="underline">{recipe?.title}</h1>
      <ul className="list-disc">
        {ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>;
        })}
      </ul>
      <ol className="list-decimal">
        {instructions.map((instruction, index) => {
          return <li key={index}>{instruction}</li>;
        })}
      </ol>
    </div>
  );
}
