<template>
  <div>
    <h2>{{ stepdata.title }}</h2>
    <p class="mb-5">{{ stepdata.text}}</p>
    <div class="btn-row">
      <button class="btn" @click="goToPreviousStep">Precedent</button>
      <button class="btn" @click="goToNextStep">Suivant</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
import {StepsRecipe} from "../../types/Recipe.ts";

export default defineComponent({
  props: {
    step: {
      type: Number,
      required: true
    },
    stepdata: {
      type: Object as () => StepsRecipe,
      required: true
    }
  },
  setup(props) {
    console.log(props)
    // Injection des fonctions de navigation depuis le composant parent
    const goToNextStep = inject<() => void>('goToNextStep')!;
    const goToPreviousStep = inject<() => void>('goToPreviousStep')!;

    return {
      goToNextStep,
      goToPreviousStep,
    };
  }
});
</script>