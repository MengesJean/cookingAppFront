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
            <label for="time">Temps (en minutes)</label>
            <input id="time" v-model="recipe.time" type="number" required>
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
        difficulty: 0,
        ingredients: [],
      });

      const availableIngredients = ref<Ingredient[]>([]);
  
      const fetchRecipe = async (id: string) => {
        try {
          const response = await axios.get(`http://localhost:3000/recipes/${id}`);
          Object.assign(recipe, response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchIngredients = async () => {
        try {
          const response = await axios.get('http://localhost:3000/ingredients');
          availableIngredients.value = response.data;
          console.log(availableIngredients.value)
        } catch (error) {
          console.error(error);
        }
      };
  
      const submitForm = async () => {
        try {
            if (recipe._id) {
              const preparedRecipe = {
                  ...recipe, // Copiez les autres propriétés de la recette normalement
                  ingredients: recipe.ingredients.map(ingredientInRecipe => ({
                    ...ingredientInRecipe, // Copiez les autres propriétés comme quantity et unit
                    ingredient: ingredientInRecipe.ingredient._id // Remplacez l'objet Ingredient complet par juste l'ID
                  }))
                }
                await axios.patch(`http://localhost:3000/recipes/${recipe._id}`, preparedRecipe);
            } else {
              console.log(recipe)
            await axios.post('http://localhost:3000/recipes', recipe);
          }
          router.push('/');
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
    },
  });
  </script>
  
  <style scoped>
  /* Vos styles ici */
  </style>