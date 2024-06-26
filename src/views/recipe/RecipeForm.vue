<template>
    <div class="recipe-form">
      <h1>{{ recipe._id ? 'Modifier' : 'Créer' }} une recette</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="title">Titre</label>
            <input id="title" v-model="recipe.title" type="text" required>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="recipe.description" required></textarea>
        </div>
        <div class="form-group">
            <label for="time">Temps de préparation (en minutes)</label>
            <input id="time" v-model="recipe.time" type="number" required>
        </div>
        <div class="form-group">
            <label for="time_cooking">Temps de cuisson (en minutes)</label>
            <input id="time_cooking" v-model="recipe.time_cooking" type="number" required>
        </div>
        <div class="form-group">
            <label for="difficulty">Difficulté</label>
            <input id="difficulty" v-model="recipe.difficulty" type="number" required>
        </div>
        <div class="form-group mt-8">
          <h2>Ingrédients</h2>
          <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient">
            <div class="grid grid-cols-4 gap-3 items-center">
              <div>
                <label for="ingredient">Ingrédient:</label>
                <select v-model="ingredient.ingredient._id" required>
                  <option v-for="ingredient in availableIngredients" :key="ingredient._id" :value="ingredient._id">
                    {{ ingredient.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="quantite">Quantité:</label>
                <input v-model="ingredient.quantity" type="number" required step="0.1">
              </div>
              <div>
                <label for="unit">Unité:</label>
                <input v-model="ingredient.unit" type="text">
              </div>
              <div>
                <button class="btn btn-danger" @click="removeIngredient(index)">Supprimer</button>
              </div>
            </div>

          </div>
          <button type="button" class="btn mb-3" @click="addIngredient">Ajouter un ingrédient</button>
        </div>
        <div class="form-group mt-8">
          <h2>Étapes</h2>
          <div v-for="(step, index) in recipe.steps" :key="index" class="steps">
            <div>
              <label for="step_title">Titre</label>
              <input type="text" v-model="step.title" required>
            </div>
            <div>
              <label for="step_text">Contenu</label>
              <input type="text" v-model="step.text" required>
            </div>
            <button class="btn btn-danger" @click="removeStep(index)">Supprimer l'étape</button>
          </div>
          <button class="btn mb-3" @click="addStep">Ajouter une étape</button>
        </div>
        <button type="submit" class="btn">{{ recipe._id ? 'Modifier' : 'Créer' }}</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import { Recipe } from '../../types/Recipe';
  import { Ingredient } from '../../types/Ingredient';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();

      const recipe = reactive<Recipe>({
        _id: undefined,
        title: '',
        description: '',
        time: 0,
        time_cooking: 0,
        difficulty: 0,
        ingredients: [],
        steps: [],
      });

      const availableIngredients = ref<Ingredient[]>([]);
  
      const fetchRecipe = async (id: string) => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URL}/recipes/${id}`);
          Object.assign(recipe, response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchIngredients = async () => {
        try {
          const response = await axios.get(import.meta.env.VITE_DEFAULT_API_URL + '/ingredients');
          availableIngredients.value = response.data;
        } catch (error) {
          console.error(error);
        }
      };
  
      const submitForm = async () => {
        try {
            if (recipe._id) {
              const preparedRecipe = {
                  ...recipe,
                  ingredients: recipe.ingredients.map(ingredientInRecipe => ({
                    ...ingredientInRecipe,
                    ingredient: ingredientInRecipe.ingredient._id
                  }))
                }
                await axios.patch(`${import.meta.env.VITE_DEFAULT_API_URL}/recipes/${recipe._id}`, preparedRecipe);
            } else {
              const preparedRecipe = {
                  ...recipe,
                  ingredients: recipe.ingredients.map(ingredientInRecipe => ({
                    ...ingredientInRecipe,
                    ingredient: ingredientInRecipe.ingredient._id
                  }))
                }
            await axios.post(import.meta.env.VITE_DEFAULT_API_URL + '/recipes', preparedRecipe);
          }
          await router.push('/');
        } catch (error) {
          console.error(error);
        }
      };

      onMounted(() => {
        if (route.params.id) {
            fetchRecipe(route.params.id as string);
        }
        fetchIngredients();
      });
  
      return { recipe, submitForm, availableIngredients};
    }, 
    methods: {
      addIngredient() {
        this.recipe.ingredients.push({
          ingredient: {
            _id: '',
            name: ''
          },
          quantity: 0,
          unit: ''
        });
      },
      removeIngredient(index: number) {
        this.recipe.ingredients.splice(index, 1);
      },
      addStep() {
        this.recipe.steps.push({
          title: '',
          text: ''
        })
      },
      removeStep(index: number) {
        this.recipe.steps.splice(index, 1);
      }
    },
  });
  </script>
  
  <style scoped>
  /* Vos styles ici */
  </style>