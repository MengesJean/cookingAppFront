import { Ingredient } from "./Ingredient";

export interface Recipe {
    _id: string | undefined;
    title: string;
    description: string;
    time: number;
    time_cooking: number;
    difficulty: number;
    ingredients: IngredientRecipe[];
}

export interface IngredientRecipe {
    ingredient: Ingredient;
    quantity: number;
    unit: string;
}