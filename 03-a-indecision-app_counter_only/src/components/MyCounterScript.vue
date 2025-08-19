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
import { defineComponent } from 'vue';
import { useCounter } from '../composables/useCounter';

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  setup( props) {
    const { counter, squareCounter } = useCounter(props.value);

    return {
      counter,
      squareCounter
    };
  }
});
</script>
