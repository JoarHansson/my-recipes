import { z } from "zod";

export type Ingredient = {
  name: string;
};

export type Instruction = Ingredient;

// zod schemas and types
const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient must be at least 1 character."),
});

const instructionSchema = z.object({
  name: z.string().min(1, "Instruction must be at least 1 character."),
});

export const recipeSchema = z.object({
  title: z.string().min(1, "Recipe title must be at least 1 character."),
  description: z.string(), // optional
  ingredients: z.array(ingredientSchema),
  instructions: z.array(instructionSchema),
});

export type TRecipeSchema = z.infer<typeof recipeSchema>;
