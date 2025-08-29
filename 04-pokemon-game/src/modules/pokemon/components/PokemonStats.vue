<template>
  <section class="mt-8 flex flex-col items-center space-y-2">
    <div class="flex items-center space-x-3">
      <span class="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full shadow">
        ✅ Correctas: {{ correctAnswers }} ({{ porcentajeCorrectAnswers }}%)
      </span>
    </div>
    <div class="flex items-center space-x-3">
      <span class="text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-full shadow">
        ❌ Incorrectas: {{ wrongAnswers }} ({{ porcentajeWrongAnswers }}%)
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">

import { computed, defineProps } from 'vue';

interface Props {
  correctAnswers: number;
  wrongAnswers: number;
}

const props = defineProps<Props>();

const porcentajeCorrectAnswers = computed(() => {
  const total = props.correctAnswers + props.wrongAnswers;
  return total === 0 ? '0.00' : ((props.correctAnswers / total) * 100).toFixed(2);
});

const porcentajeWrongAnswers = computed(() => {
  const total = props.correctAnswers + props.wrongAnswers;
  return total === 0 ? 0 : ((props.wrongAnswers / total) * 100).toFixed(2);
});

</script>