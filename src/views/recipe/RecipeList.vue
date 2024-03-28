<template>
    <div v-if="loading">
        Chargement...
    </div>
    <div v-else>
        <div class="btn-row">
            <router-link to="/recipe/form" class="btn">Nouvelle recette</router-link>
        </div>
        <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <RecipeCard v-for="recipe in recipes" :key="recipe._id" :recipe="recipe" />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import { Recipe } from '../../types/Recipe';
    import axios from 'axios';
    import RecipeCard from '../../components/recipe/RecipeCard.vue';

    export default defineComponent({
    components: {
        RecipeCard,
    },
    setup() {
        const recipes = ref<Recipe[]>([]);
        const loading = ref(true);
        
        const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/recipes');
            recipes.value = response.data;
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
        };

        onMounted(fetchRecipes);
        return { recipes, loading };
    },
    });
</script>

<style scoped>
    /* Vos styles ici */
</style>