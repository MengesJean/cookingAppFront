import { Ingredient } from "./Ingredient";

export interface Recipe {
    _id: string | undefined;
    title: string;
    description: string;
    time: number;
    difficulty: number;
    ingredients: IngredientRecipe[];
}

export interface IngredientRecipe {
    ingredient: Ingredient;
    quantity: number;
    unit: string;
}

export interface IngredientInRecipeSend {
    ingredient: string; // L'ID de l'ingrédient
    quantity: number;
    unit: string;
}