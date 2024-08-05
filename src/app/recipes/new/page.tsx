"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { createRecipe } from "@/actions/actions";
import { recipeSchema, TRecipeSchema } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          {...register("title")}
          type="text"
          placeholder="Recipe title"
          className="rounded px-4 py-2"
        />
        {errors.title && (
          <p className="text-red-500">{`${errors.title.message}`}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          {...register("description")}
          type="text"
          placeholder="A short description (optional)"
          className="rounded px-4 py-2"
        />
        {errors.description && (
          <p className="text-red-500">{`${errors.description.message}`}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Ingredients</Label>
        {ingredientFields.map((field, index) => {
          return (
            <div key={field.id} className="mb-4">
              <div className="flex space-x-4">
                <Input
                  {...register(`ingredients.${index}.name` as const)}
                  type="textarea"
                  placeholder={`Ingredient ${index + 1}`}
                  className="rounded px-4 py-2"
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={() => removeIngredient(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              {errors.ingredients && errors.ingredients[index] && (
                <p className="text-red-500">
                  {errors.ingredients[index]?.name?.message}
                </p>
              )}
            </div>
          );
        })}
        <Button
          type="button"
          variant={"secondary"}
          onClick={() => appendIngredient({ name: "" })}
        >
          Another ingredient
        </Button>
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Instructions</Label>
        {instructionFields.map((field, index) => {
          return (
            <div key={field.id} className="mb-4">
              <div className="flex space-x-4">
                <Input
                  {...register(`instructions.${index}.name` as const)}
                  type="text"
                  placeholder={`Instruction ${index + 1}`}
                  className="rounded px-4 py-2"
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={() => removeInstruction(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              {errors.instructions && errors.instructions[index] && (
                <p className="text-red-500">
                  {errors.instructions[index]?.name?.message}
                </p>
              )}
            </div>
          );
        })}
        <Button
          type="button"
          variant={"secondary"}
          onClick={() => appendInstruction({ name: "" })}
        >
          Another instruction
        </Button>
      </div>

      <Button disabled={isSubmitting} type="submit">
        Add recipe
      </Button>
    </form>
  );
}
