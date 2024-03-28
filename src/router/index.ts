import { createRouter, createWebHistory } from 'vue-router';
import RecipeList from '../views/recipe/RecipeList.vue';
import RecipeItem from '../views/recipe/RecipeItem.vue';
import RecipeForm from '../views/recipe/RecipeForm.vue';
import IngredientList from '../views/ingredient/IngredientList.vue';
import IngredientForm from '../views/ingredient/IngredientForm.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: RecipeList
    },
    // Recipe routes
    {
        path: '/recipes',
        name: 'RecipeList',
        component: RecipeList
    },
    {
        path: '/recipe/:id',
        name: 'RecipeItem',
        component: RecipeItem,
        props: true,
    },
    {
        path: '/recipe/form',
        name: 'RecipeFormCreate',
        component: RecipeForm,
    },
    {
        path: '/recipe/form/:id',
        name: 'RecipeFormEdit',
        component: RecipeForm,
        props: true,
    },
    // Ingredient routes
    {
        path: '/ingredients',
        name: 'IngredientList',
        component: IngredientList
    },
    // {
    //     path: '/ingredient/:id',
    //     name: 'IngredientItem',
    //     props: true,
    // },
    {
        path: '/ingredient/form',
        name: 'IngredientFormCreate',
        component: IngredientForm
    },
    {
        path: '/ingredient/form/:id',
        name: 'IngredientFormEdit',
        component: IngredientForm,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;