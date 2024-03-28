<template>
    <div v-if="recipe">
        <div class="btn-row">
            <router-link :to="{name: 'RecipeFormEdit',  params: {id: recipe._id}}" class="btn">Modifier</router-link>
            <button @click="deleteRecipe" class="btn btn-danger">Supprimer</button>
        </div>
        <h1>{{ recipe.title }}</h1>
        <p>{{ recipe.description }}</p>
        <p>Temps : {{ recipe.time }} min</p>
        <p>Difficulté : {{ recipe.difficulty }}/10</p>
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
                    <td><img :src="ingredient.ingredient.imageUrl || defaultImage" class="size-24 object-cover mr-3"/></td>
                    <td>{{ ingredient.ingredient.name }}</td>
                    <td>{{ ingredient.quantity }} {{ ingredient.unit }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import { Recipe } from '../../types/Recipe';
    import axios from 'axios';
    import RecipeCard from '../../components/recipe/RecipeCard.vue';
    import { useRoute, useRouter } from 'vue-router';

    export default defineComponent({
        components: {
            RecipeCard,
        },
        setup() {
            const defaultImage = import.meta.env.VITE_DEFAULT_IMG_INGREDIENT;
            const recipe = ref<Recipe | null>(null);
            const loading = ref(true);
            const route = useRoute();
            const router = useRouter();
            
            const fetchRecipes = async () => {
                const id = route.params.id;

                try {
                    const response = await axios.get(`http://localhost:3000/recipes/${id}`);
                    recipe.value = response.data;
                } catch (error) {
                    console.error(error);
                } finally {
                    loading.value = false;
                }
            };

            const deleteRecipe = async () => {
                if(!recipe.value) return;
                const confirmation = window.confirm('Voulez-vous vraiment supprimer cette recette ?');
                if(confirmation) {
                    try {
                        await axios.delete(`http://localhost:3000/recipes/${recipe.value._id}`);
                        router.push('/');
                    } catch (error) {
                        console.error(error);
                    }
                }
            };

            onMounted(fetchRecipes);
            return { recipe, loading, deleteRecipe, defaultImage };
        },
    });
</script>

<style scoped>
    /* Vos styles ici */
</style>../../types/Recipe../../components/recipe/RecipeCard.vue