import prisma from "@/lib/db";

import { Typography } from "@/components/ui/typography";
import RecipePage from "./page";

type RecipeLayoutProps = {
  params: { id: string };
};

export default async function RecipeLayout({ params }: RecipeLayoutProps) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!recipe) {
    return <Typography variant={"h1"}>Recipe not found</Typography>;
  }

  return (
    <>
      <Typography variant={"h1"} className="mb-8">
        {recipe?.title}
      </Typography>

      <RecipePage recipe={recipe} />
    </>
  );
}
