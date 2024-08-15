"use client";

import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import { ViewToggle } from "@/components/view-toggle";
import { Recipe } from "@prisma/client";
import { Ingredient, Instruction } from "@/lib/types";

export default function RecipePage({ recipe }: { recipe: Recipe }) {
  const ingredients: Ingredient[] = JSON.parse(recipe?.ingredients || "[]");
  const instructions: Instruction[] = JSON.parse(recipe?.instructions || "[]");

  const [currentView, setCurrentView] = useState("ingredients"); // ingredients as initial state seems intuitive

  const getCurrentView = () => {
    if (currentView === "ingredients") {
      return true;
    }
    return false;
  };

  return (
    <>
      <ViewToggle
        className={"rounded-full"}
        logoIsBanana={getCurrentView()}
        onClickIngredientsLogo={() => setCurrentView("instructions")}
        onClickInstructionsLogo={() => setCurrentView("ingredients")}
      />

      {currentView === "ingredients" && (
        <>
          <Typography variant={"h2"}>Ingredients</Typography>
          <Typography variant={"ul"}>
            {ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient.name}</li>;
            })}
          </Typography>
        </>
      )}

      {currentView === "instructions" && (
        <>
          <Typography variant={"h2"}>Instructions</Typography>
          <Typography variant={"ol"}>
            {instructions.map((instruction, index) => {
              return <li key={index}>{instruction.name}</li>;
            })}
          </Typography>
        </>
      )}
    </>
  );
}
