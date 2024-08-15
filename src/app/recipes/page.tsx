import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function RecipesPage() {
  const recipes = await prisma.recipe.findMany();

  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <Typography variant={"h1"}>My recipes</Typography>
        <Button asChild>
          <Link href="/recipes/new">New recipe</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase">Recipe</TableHead>
            <TableHead className="text-right uppercase">Date added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.id}>
              <TableCell className="">
                <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              </TableCell>
              <TableCell className="text-nowrap text-right">
                {recipe.updatedAt.toLocaleDateString("sv-SE")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
