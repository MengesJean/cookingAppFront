<template>
    <div class="recipe-card bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- <img class="w-full h-32 object-cover" :src="recipe.image" :alt="recipe.title" /> -->
      <router-link :to="{name: 'RecipeItem',  params: {id: recipe._id}}" class="block p-4">
        <h2 class="font-semibold text-lg">{{ recipe.title }}</h2>
        <p class="text-gray-600">{{ recipe.description }}</p>
        <p class="text-gray-600">{{ recipe.time }} min</p>
        <p class="text-gray-600">{{ recipe.difficulty }} min</p>
      </router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
    import { Recipe } from '../../types/Recipe';
  
  export default defineComponent({
    props: {
      recipe: {
        type: Object as PropType<Recipe>,
        required: true,
      },
    },
    setup(props) {
      const { recipe } = props;
      return { recipe };
    },
  });
  </script>
  
  <style scoped>
  /* Vos styles CSS pour RecipeCard */
  </style>../../types/Recipe