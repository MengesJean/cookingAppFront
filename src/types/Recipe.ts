import { Ingredient } from "./Ingredient";

export interface Recipe {
    _id: string | undefined;
    title: string;
    description: string;
    time: number;
    time_cooking: number;
    difficulty: number;
    ingredients: IngredientRecipe[];
    steps: StepsRecipe[];
}

export interface IngredientRecipe {
    ingredient: Ingredient;
    quantity: number;
    unit: string;
}


export interface IngredientRecipeChecklist {
    ingredient: Ingredient;
    quantity: number;
    unit: string;
    checked: boolean;
}

export interface StepsRecipe {
    title: string;
    text: string;
}