"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        className="absolute scale-0 transition-all dark:scale-100"
        onClick={() => setTheme("light")}
      >
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="scale-100 transition-all dark:scale-0"
        onClick={() => setTheme("dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0" />
      </Button>
    </div>
  );
}
