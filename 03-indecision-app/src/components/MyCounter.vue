<template> 
  <section class="container mt-5">
    <h3>counter {{ counter }}</h3>
    <h3>square: {{ squareCounter }}</h3>

    <div>
      <button @click="counter++" class="btn">+1</button>
      <button @click="counter--" class="btn">-1</button>
    </div>
  </section>
</template>

<script lang="ts" setup>
// ------- USANDO COMPOSABLE -----
import { useCounter } from '../composables/useCounter';

// interface Props {
//   value: number;
// }

// const props = defineProps<Props>();

const { counter, squareCounter } = useCounter(10);
// ------- FIN COMPOSABLE --------

// import { computed, ref } from 'vue';

// interface Props {
//   value: number;
// }

// const props = defineProps<Props>();

// const counter = ref( props.value );
// const squareCounter = computed(() => counter.value * counter.value);
</script>

<style scoped>
  @reference "../style.css";

  .btn{
    @apply bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded;
  }
</style>