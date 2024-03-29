<template>
  <div>
    <h2>Ingredients</h2>
    <div v-for="ingredient in checkListIngredients" :key="ingredient.ingredient._id" class="grid grid-cols-4 mb-2">
      <label class="col-span-2" :for="ingredient.ingredient._id">{{ ingredient.ingredient.name }} {{ ingredient.quantity }} {{ ingredient.unit }}</label>
      <input type="checkbox" :id="ingredient.ingredient._id" v-model="ingredient.checked">
    </div>
    <button class="btn" @click="goToNextStep" v-if="checkListCompleted">Commencer à cuisiner !</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, Ref, ref, watch} from 'vue';
import {IngredientRecipe, IngredientRecipeChecklist} from "../../types/Recipe.ts";

export default defineComponent({
  props: {
    ingredients: {
      type: Array as () => IngredientRecipe[],
      required: true
    }
  },
  setup(props) {
    const checkListCompleted = ref(false);
    const { ingredients } = props;
    const checkListIngredients: Ref<IngredientRecipeChecklist[]> = ref(ingredients.map(ingredient => {
      return {
        ingredient: ingredient.ingredient,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        checked: false,
      };
    }))
    const isCompleted = ref(false);
    const goToNextStep = inject<() => void>('goToNextStep')!;

    watch(checkListIngredients, async () => {
      const filteredIngredients = checkListIngredients.value.filter( item => {
        if(!item.checked){
          return item;
        }
      });
      if (filteredIngredients.length === 0){
        checkListCompleted.value = true;
      }
    }, {deep: true})
    return {
      checkListIngredients,
      isCompleted,
      checkListCompleted,
      goToNextStep
    };
  }
});
</script>