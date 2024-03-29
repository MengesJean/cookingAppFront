<template>
  <div id="app" class="bg-slate-200">
    <header>
      <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
          <router-link :to="{name: 'Home'}" class="text-white">Accueil</router-link>
          <router-link :to="{name: 'RecipeList'}" class="text-white">Recettes</router-link>
          <router-link :to="{name: 'IngredientList'}" class="text-white">Ingredients</router-link>
        </div>
      </nav>
    </header>
    
    <!-- Le contenu de la route actuelle sera rendu ici -->
    <div class="container py-4 px-3 mx-auto">
      <router-view/>
    </div>
    
    <footer>
      <div class="bg-gray-800 p-4 text-white text-center">
        &copy; 2024 Mon application de recettes
      </div>

      
    </footer>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
  });
</script>

<style scoped>

</style>