import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Ingredient, Instruction } from "@/lib/types";

const prisma = new PrismaClient();

let fakeRecipes: Prisma.RecipeCreateInput[] = [];

for (let i = 0; i < 10; i++) {
  let ingredients: Ingredient[] = [];
  let instructions: Instruction[] = [];

  for (let j = 0; j < 10; j++) {
    ingredients.push({ name: faker.word.words({ count: { min: 2, max: 5 } }) });

    // run the loop between 1 and 10 times
    // -> 20% chance to break the loop each iteration
    const random = Math.random();
    if (random < 0.2) break;
  }

  for (let k = 0; k < 10; k++) {
    instructions.push({
      name: faker.word.words({ count: { min: 5, max: 20 } }),
    });

    const random = Math.random();
    if (random < 0.2) break;
  }

  fakeRecipes.push({
    title: faker.word.words(),
    description: faker.word.words(5),
    ingredients: JSON.stringify(ingredients),
    instructions: JSON.stringify(instructions),
  });
}

async function main() {
  console.log("Start seeding...");

  for (const recipe of fakeRecipes) {
    const newRecipe = await prisma.recipe.create({
      data: recipe,
    });

    console.log(`Created recipe with id ${newRecipe.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
