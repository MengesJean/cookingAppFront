<template>
    <div>
        <h1>{{ ingredient._id ? 'Modifier' : 'Créer' }} un ingrédient</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Nom</label>
                <input type="text" id="name" v-model="ingredient.name" required>
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <img v-if="ingredient.imageUrl" :src="ingredient.imageUrl" alt="Image de l'ingrédient" style="max-width: 200px;"/>
                <input type="file" id="image" ref="image" required>
            </div>
            <button type="submit" class="btn">Enregistrer</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref, onMounted, Ref } from 'vue';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';
    import { Ingredient } from '../../types/Ingredient';

    export default defineComponent({
        setup() {
            const ingredient = reactive<Ingredient>({
                _id: undefined,
                name: '',
            });
            const image: Ref<HTMLInputElement | null> = ref(null);
            const route = useRoute();
            const router = useRouter();

            const fetchIngredient = async (id: string) => {
                try {
                    const response = await axios.get<Ingredient>(`${import.meta.env.VITE_DEFAULT_API_URL}/ingredients/${id}`);
                    Object.assign(ingredient, response.data);
                } catch (error) {
                    console.error(error);
                }
            };

            const submitForm = async () => {
                try {
                    const formData = new FormData();
                    formData.append('name', ingredient.name);
                    formData.append('imageUrl', '');
                    if (image.value?.files) {
                        formData.append('file', image.value.files[0]);
                    }

                    if (ingredient._id) {
                        await axios.patch(`${import.meta.env.VITE_DEFAULT_API_URL}/ingredients/${ingredient._id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                    } else {
                        await axios.post(import.meta.env.VITE_DEFAULT_API_URL + '/ingredients', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
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

            return { ingredient, submitForm, image };
        },
    });
</script>
