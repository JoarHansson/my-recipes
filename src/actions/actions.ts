"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function createRecipe(formData: FormData) {
  console.log(formData);

  await prisma.recipe.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      ingredients: formData.get("ingredients") as string,
      instructions: formData.get("instructions") as string,
    },
  });
}

export async function redirectToRecipesPage() {
  await redirect("/recipes");
}
