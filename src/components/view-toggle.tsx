"use client";

import * as React from "react";
import { Carrot, CookingPot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewToggleProps = {
  className: string;
  onClickIngredientsLogo: () => void;
  onClickInstructionsLogo: () => void;
  logoIsBanana: boolean;
};

export function ViewToggle({
  className,
  onClickIngredientsLogo,
  onClickInstructionsLogo,
  logoIsBanana,
}: ViewToggleProps) {
  return (
    <>
      {logoIsBanana ? (
        <Button
          size="icon"
          className={cn("fixed bottom-6 right-6", className)}
          onClick={onClickIngredientsLogo}
        >
          <CookingPot className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      ) : (
        <Button
          size="icon"
          className={cn("fixed bottom-6 right-6", className)}
          onClick={onClickInstructionsLogo}
        >
          <Carrot className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      )}
    </>
  );
}
