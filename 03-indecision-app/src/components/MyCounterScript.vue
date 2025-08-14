<template> 
  <section class="container mt-5">
    <h3>counter {{ counter }}</h3>
    <h3>square: {{ squareCounter }}</h3>

    <div>
      <button @click="counter++" class="btn btn-success">+1</button>
      <button @click="counter--" class="btn btn-danger ms-1">-1</button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  setup( props) {
    const counter = ref(props.value);
    const squareCounter = computed(() => counter.value * counter.value);

    return {
      counter,
      squareCounter
    };
  }
});

// import { computed, ref } from 'vue';

// interface Props {
//   value: number;
// }

// const props = defineProps<Props>();

// const counter = ref( props.value );
// const squareCounter = computed(() => counter.value * counter.value);
</script>
