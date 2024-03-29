<template>
  <div class="recipe-app">
    <div class="recipe-app__container">
      <button class="btn btn-danger" @click="hideAppState">Fermer</button>
      <!-- Affiche le composant de la liste d'ingrédients si on est à la première étape -->
      <IngredientsChecklist v-if="currentStep === 0" :ingredients="ingredients"/>
      <!-- Affiche le composant de l'étape de la recette pour les étapes suivantes -->
      <RecipeStep v-else-if="currentStep <= totalSteps" :stepdata="step" :step="currentStep" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, ref, watch} from 'vue';
import IngredientsChecklist from './IngredientsCheckList.vue';
import RecipeStep from './RecipeStep.vue';
import {IngredientRecipe, StepsRecipe} from "../../types/Recipe.ts";

export default defineComponent({
  components: {
    IngredientsChecklist,
    RecipeStep,
  },
  props: {
    ingredients: {
      type: Array as () => IngredientRecipe[],
      default: () => [],
    },
    steps: {
      type: Array as () => StepsRecipe[],
      default: () => [],
    },
  },
  setup(props) {
    const { steps } = props;
    const currentStep = inject('currentStep') as any;
    const totalSteps = inject('totalSteps') as any;
    const hideAppState = inject('hideAppState') as any;
    const step = ref(steps[currentStep.value - 1]);
    watch(currentStep, () => {
      step.value = steps[currentStep.value - 1];
    });
    return {
      currentStep,
      totalSteps,
      steps,
      step,
      hideAppState,
    };
  },
});
</script>
<style>
.recipe-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: wheat;
}
.recipe-app__container {
  max-width: 980px;
  margin: 0 auto;
}
</style>