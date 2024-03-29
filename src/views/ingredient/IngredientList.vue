<template>
    <div v-if="loading">
        Chargement...
    </div>
    <div v-else>
        <div class="btn-row">
        <router-link :to="{name: 'IngredientFormCreate'}" class="btn">Nouvel ingrédient</router-link>
        </div>
        <div class="relative overflow-x-auto mt-3">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col"></th>
                        <th class="px-6 py-3" scope="col">Nom</th>
                        <th class="px-6 py-3 text-right" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <IngredientCard v-for="ingredient in ingredients" :key="ingredient._id" :ingredient="ingredient" :deleteIngredient="deleteIngredient"/>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import { Ingredient } from '../../types/Ingredient';
    import axios from 'axios';
    import IngredientCard from '../../components/ingredient/IngredientCard.vue';

    export default defineComponent({
        components: {
            IngredientCard,
        },
        setup() {
            const ingredients = ref<Ingredient[]>([]);
            const loading = ref(true);
            
            const fetchIngredients = async () => {
                try {
                    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_URL + '/ingredients');
                    ingredients.value = response.data;
                } catch (error) {
                    console.error(error);
                } finally {
                    loading.value = false;
                }
            };

            onMounted(fetchIngredients);
            return { ingredients, loading };
        },
        methods: {
            async deleteIngredient(ingredient: Ingredient) {
                try {
                    let confirmation = window.confirm('Voulez-vous vraiment supprimer cet ingrédient ?');
                    if(confirmation === false) return;
                    await axios.delete(`${import.meta.env.VITE_DEFAULT_API_URL}/ingredients/${ingredient._id}`);
                    this.ingredients = this.ingredients.filter(i => i._id !== ingredient._id);
                } catch (error) {
                    console.error(error);
                }
            }
        },
    });
</script>