import { ref } from 'vue';

export const useRecipeSteps = (initialStepsCount = 5) => {
    const currentStep = ref(0);
    const totalSteps = ref(initialStepsCount);
    const appState = ref(false);

    const goToNextStep = () => {
        if (currentStep.value < totalSteps.value) {
            currentStep.value++;
            console.log(currentStep.value)
        }
    }

    const goToPreviousStep = () => {
        if (currentStep.value > 0) {
            currentStep.value--;
        }
    }

    const showAppState = () => {
        appState.value = true;
    }
    const hideAppState = () => {
        appState.value = false;
    }

    return { currentStep, goToNextStep, goToPreviousStep, totalSteps, appState, showAppState, hideAppState};
}