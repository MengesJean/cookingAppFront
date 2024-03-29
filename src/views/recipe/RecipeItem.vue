<template>
  <div v-if="recipe">
    <div class="btn-row">
      <router-link :to="{name: 'RecipeFormEdit',  params: {id: recipe._id}}" class="btn">Modifier</router-link>
      <button @click="deleteRecipe" class="btn btn-danger">Supprimer</button>
    </div>
    <div class="mb-4">
      <h1>{{ recipe.title }}</h1>
      <p class="mb-3">{{ recipe.description }}</p>
      <p><b>Temps de préparation :</b> {{ recipe.time }} min</p>
      <p><b>Temps de cuisson :</b> {{ recipe.time_cooking }} min</p>
      <p><b>Difficulté :</b> {{ recipe.difficulty }}/10</p>
    </div>
    <div class="grid md:grid-cols-2">
      <div class="mb-4">
        <h2>Ingrédients</h2>
        <table>
          <thead>
          <tr>
            <th></th>
            <th>Ingrédient</th>
            <th>Quantité</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="ingredient in recipe.ingredients" :key="ingredient.ingredient._id">
            <td>
              <img :src="ingredient.ingredient.imageUrl || defaultImage" class="size-24 object-cover mr-3" alt=""/>
            </td>
            <td>{{ ingredient.ingredient.name }}</td>
            <td>{{ ingredient.quantity }} {{ ingredient.unit }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-3">
        <h2>Étapes</h2>
        <div v-for="(step, index) in recipe.steps" :key="index">
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </div>
      </div>
    </div>
    <button @click="showAppState" class="max-md:fixed bottom-0 left-0 right-0 btn text-center">Lancer la recette</button>
    <div v-if="appState">
      <recipe-app :ingredients="recipe.ingredients" :steps="recipe.steps"></recipe-app>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, provide, ref} from 'vue';
import {Recipe} from '../../types/Recipe';
import axios from 'axios';
import RecipeCard from '../../components/recipe/RecipeCard.vue';
import {useRoute, useRouter} from 'vue-router';
import RecipeApp from "../../components/recipe/RecipeApp.vue";
import {useRecipeSteps} from "../../composables/useRecipeSteps.ts";

export default defineComponent({
  components: {
    RecipeApp,
    RecipeCard,
  },
  setup() {
    const defaultImage = import.meta.env.VITE_DEFAULT_IMG_INGREDIENT;
    const recipe = ref<Recipe | null>(null);
    const loading = ref(true);
    const route = useRoute();
    const router = useRouter();

    const { currentStep, goToNextStep, goToPreviousStep, totalSteps, showAppState, hideAppState, appState } = useRecipeSteps(recipe.value?.steps.length);
    provide('currentStep', currentStep);
    provide('goToNextStep', goToNextStep);
    provide('goToPreviousStep', goToPreviousStep);
    provide('totalSteps', totalSteps);
    provide('showAppState', showAppState);
    provide('hideAppState', hideAppState);

    const fetchRecipes = async () => {
      const id = route.params.id;

      try {
        const response = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URL}/recipes/${id}`);
        recipe.value = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const deleteRecipe = async () => {
      if (!recipe.value) return;
      const confirmation = window.confirm('Voulez-vous vraiment supprimer cette recette ?');
      if (confirmation) {
        try {
          await axios.delete(`${import.meta.env.VITE_DEFAULT_API_URL}/recipes/${recipe.value._id}`);
          await router.push('/');
        } catch (error) {
          console.error(error);
        }
      }
    };


    onMounted(fetchRecipes);
    return {recipe, loading, deleteRecipe, defaultImage, RecipeApp, hideAppState, showAppState, appState};
  },
});
</script>

<style scoped>
/* Vos styles ici */
</style>