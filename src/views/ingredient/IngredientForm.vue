<template>
    <div>
        <h1>{{ ingredient._id ? 'Modifier' : 'Créer' }} un ingredient</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Nom</label>
                <input type="text" id="name" v-model="ingredient.name" required>
            </div>
            <button type="submit" class="btn">Enregistrer</button>
        </form>
    </div>
</template>
<script lang="ts">
    import { defineComponent, reactive,  onMounted} from 'vue';
    import { Ingredient } from '../../types/Ingredient';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';
    
    export default defineComponent({
        setup() {
            const ingredient = reactive<Ingredient>({
                _id: undefined,
                name: '',
            });
            const route = useRoute();
            const router = useRouter();

            const fetchIngredient = async (id: string) => {
                try {
                const response = await axios.get(`http://localhost:3000/ingredients/${id}`);
                    Object.assign(ingredient, response.data);
                } catch (error) {
                    console.error(error);
                }
            };
        
            const submitForm = async () => {
                try {
                    if (ingredient._id) {
                        await axios.patch(`http://localhost:3000/ingredients/${ingredient._id}`, ingredient);
                    } else {
                        console.log(ingredient)
                        await axios.post('http://localhost:3000/ingredients', ingredient);
                    }
                    router.push('/ingredients');
                } catch (error) {
                    console.error(error);
                }
            };
        
            onMounted(() => {
                if (route.params.id) {
                    fetchIngredient(route.params.id as string);
                }
            });
            
            return { ingredient, submitForm };
        },
    });
</script>