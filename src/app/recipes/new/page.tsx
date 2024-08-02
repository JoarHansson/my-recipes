"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { createRecipe } from "@/actions/actions";

const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient must be at least 1 character."),
});

const instructionSchema = z.object({
  name: z.string().min(1, "Instruction must be at least 1 character."),
});

const recipeSchema = z.object({
  title: z.string().min(1, "Recipe title must be at least 1 character."),
  description: z.string(), // optional
  ingredients: z.array(ingredientSchema),
  instructions: z.array(instructionSchema),
});

type TRecipeSchema = z.infer<typeof recipeSchema>;

export default function NewRecipe() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<TRecipeSchema>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      ingredients: [
        {
          name: "",
        },
      ],
      instructions: [
        {
          name: "",
        },
      ],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    name: "ingredients",
    control,
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    name: "instructions",
    control,
  });

  const onSubmit = async (data: TRecipeSchema) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("ingredients", JSON.stringify(data.ingredients));
    formData.append("instructions", JSON.stringify(data.instructions));

    try {
      await createRecipe(formData);
      console.log("Recipe created successfully");
    } catch (error) {
      console.error("Failed to create recipe", error);
    }

    console.log(data);

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <input
        {...register("title")}
        type="text"
        placeholder="Recipe title"
        className="rounded px-4 py-2"
      />
      {errors.title && (
        <p className="text-red-500">{`${errors.title.message}`}</p>
      )}

      <input
        {...register("description")}
        type="text"
        placeholder="A short description (optional)"
        className="rounded px-4 py-2"
      />
      {errors.description && (
        <p className="text-red-500">{`${errors.description.message}`}</p>
      )}

      <div>
        <label>ingredients:</label>
        {ingredientFields.map((field, index) => {
          return (
            <div key={field.id}>
              <input
                {...register(`ingredients.${index}.name` as const)}
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                className="rounded px-4 py-2"
              />
              {index > 0 && (
                <button type="button" onClick={() => removeIngredient(index)}>
                  Remove
                </button>
              )}
              {errors.ingredients && errors.ingredients[index] && (
                <p className="text-red-500">
                  {errors.ingredients[index]?.name?.message}
                </p>
              )}
            </div>
          );
        })}
        <button type="button" onClick={() => appendIngredient({ name: "" })}>
          Add another ingredient
        </button>
      </div>

      <div>
        <label>instructions:</label>
        {instructionFields.map((field, index) => {
          return (
            <div key={field.id}>
              <input
                {...register(`instructions.${index}.name` as const)}
                type="text"
                placeholder={`instruction ${index + 1}`}
                className="rounded px-4 py-2"
              />
              {index > 0 && (
                <button type="button" onClick={() => removeInstruction(index)}>
                  Remove
                </button>
              )}
              {errors.instructions && errors.instructions[index] && (
                <p className="text-red-500">
                  {errors.instructions[index]?.name?.message}
                </p>
              )}
            </div>
          );
        })}
        <button type="button" onClick={() => appendInstruction({ name: "" })}>
          Add another instruction
        </button>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="rounded bg-blue-500 py-2 disabled:bg-gray-500"
      >
        Submit
      </button>
    </form>
  );
}
