<template>
  <section class="mt-5 grid grid-cols-2 gap-2">
    <button
      v-for="{name, id} in options"
      :key="id"
      @click="$emit('selectedOption', id)"
      :disabled="blockSelection === true"
      :class="['capitalize button', {
        selected: id === selectedAnswer && blockSelection === true,
        correct: id === correctAnswer && blockSelection === true,
        incorrect: id !== correctAnswer && blockSelection === true
      }]"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
  selectedAnswer: number | null;
}

defineProps<Props>();

defineEmits<{
  selectedOption: [id: number]
}>();

</script>

<style scoped>
@reference "@/assets/styles.css";

.button{
  @apply
    bg-white shadow-md p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100
    disabled:shadow-none disabled:cursor-not-allowed disabled:bg-gray-300;
}

.correct {
  @apply !bg-green-500 text-white;
}

.incorrect {
  @apply !bg-red-200 opacity-75;
}

.selected {
  @apply border-3 border-blue-500;
}
</style>