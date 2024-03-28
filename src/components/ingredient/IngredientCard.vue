<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ ingredient.name }}</th>
        <td class="px-6 py-4 btn-row">
            <router-link :to="{ name: 'IngredientFormEdit', params: { id: ingredient._id } }" class="btn">Modifier</router-link>
            <button class="btn btn-danger" @click="handleDelete">Supprimer</button>
        </td>
    </tr>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';    
import { Ingredient } from '../../types/Ingredient';

export default defineComponent({
    props: {
        ingredient: {
            type: Object as PropType<Ingredient>,
            required: true,
        },
        deleteIngredient: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const { ingredient } = props;

        return { ingredient };
    },
    methods: {
        handleDelete() {
            this.deleteIngredient(this.ingredient);
        },
    },
});
</script>

<style scoped>
</style>