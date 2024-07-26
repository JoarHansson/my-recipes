import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

let fakeRecipes: Prisma.RecipeCreateInput[] = [];

for (let index = 0; index < 10; index++) {
  const ingredients = faker.word
    .words({ count: { min: 5, max: 10 } })
    .split(" ");
  const instructions = faker.word
    .words({ count: { min: 5, max: 10 } })
    .split(" ");

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
