<template>
  <section>
    <img v-if="showPokemon" :src="pokemonImage" class="h-[200px] fade-in-slow" alt="pokemon" />
    <img v-else :src="pokemonImage" class="brightness-0 h-[200px] transform-in" alt="pokemon" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false,
});

const pokemonImage = computed (
  () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ props.pokemonId }.svg` 
)
</script>

<style scoped>
img{
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.transform-in {
  animation: transformIn 0.35s ease-in-out forwards;
}

@keyframes transformIn {
  from { transform: scale(0.0); }
  to   { transform: scale(1); }
}
</style>