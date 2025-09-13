<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title ?? 'Confirmación' }}</h3>
      <p class="py-4">{{ subtitle ?? 'Bottom text' }}</p>

      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submiteValue">
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder ?? 'Ingrese un valor'"
            class="input input-bordered input-primary w-full flex-1"
            v-model="inputValue"
          />

          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end mt-5">
            <button class="btn mr-4" @click="emits('close')">Close</button>
            <button class="btn btn-primary">Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <!-- <div class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-screen h-screen"></div> -->
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';

interface Props {
  open: boolean;
  placeholder?: string;
  title?: string;
  subtitle?: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  close: [void];
  value: [text: string];
}>();

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

watch(
  () => props.open,
  async (open) => {
    if (open) {
      await nextTick();
      console.log('inputRef: ', inputRef.value);
      if (!inputRef.value) {
        console.warn(
          'inputRef es null — revisa si el input está en otro componente o si usas v-show/display:none',
        );
      }
      // Fallback "goloso" — debería evitarse si no es necesario:
      setTimeout(() => inputRef.value?.focus(), 50);
    }
  },
);

const submiteValue = () => {
  if (!inputValue.value) {
    // foco en el elemento
    inputRef.value?.focus();
    return;
  }

  emits('value', inputValue.value.trim());
  emits('close');

  inputValue.value = '';
};
</script>
