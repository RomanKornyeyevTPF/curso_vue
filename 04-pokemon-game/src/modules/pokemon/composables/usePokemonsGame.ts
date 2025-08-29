import { computed, onMounted, ref } from "vue";
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces";
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';


export const usePokemonGame = () => {

  const gameStatus = ref<GameStatus>( GameStatus.Playing );
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);
  const selectedAnswer = ref<number | null>(null);
  // 🔹 Contadores de respuestas
  const correctAnswers = ref(0);
  const wrongAnswers = ref(0);

  const porcentajeCorrectAnswers = computed(() => {
      const total = correctAnswers.value + wrongAnswers.value;
      return total === 0 ? 0 : ((correctAnswers.value / total) * 100).toFixed(2);
  });

  const porcentajeWrongAnswers = computed(() => {
    const total = correctAnswers.value + wrongAnswers.value;
    return total === 0 ? 0 : ((wrongAnswers.value / total) * 100).toFixed(2);
  });

  // obtener un pokemon aleatorio de las opciones
  const randomPokemon = computed (() => {
    const randomIndex = Math.floor( Math.random() * pokemonOptions.value.length );
    return pokemonOptions.value[randomIndex];
  });

  // ref = guardar un dato.
  // computed = guardar una fórmula que depende de otros datos.
  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonsArray = response.data.results.map( pokemon => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;

      return{
        name: pokemon.name,
        id: +id,
      }
    });

    return pokemonsArray.sort(() => Math.random() - 0.5); // el sort espera true/false, y Math.random() devuelve un numero entre 0 y 1
  }

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    selectedAnswer.value = null; // 🔹 reset selección
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  }

  function handleSelectedAnswer(id: number) {
    setSelectedAnswer(id);
    checkAnswer(id);
  }

  // respuesta seleccionada
  const setSelectedAnswer = (id: number) => {
    selectedAnswer.value = id;
  }

  // comprobar si la respuesta es correcta
  const checkAnswer = (id: number) => {
    const hasWon = id === randomPokemon.value.id;
    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      correctAnswers.value++;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 }
      });
    }else{
      wrongAnswers.value++;
    }

    // propiedad reactiva
    gameStatus.value = hasWon ? GameStatus.Won : GameStatus.Lost;
  }

  // ejecución del componente (funciones y demás)
  onMounted(async() => {
    await new Promise( resolve => setTimeout( resolve, 1000 ) ); // Simular retardo de 2 segundos
    pokemons.value = await getPokemons();
    getNextRound();
    
    console.log(pokemonOptions.value);
    console.log(correctAnswers.value + ", " + correctAnswers.value);
  });

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    selectedAnswer,
    correctAnswers,
    porcentajeCorrectAnswers,
    wrongAnswers,
    porcentajeWrongAnswers,
    

    // Methods
    getNextRound,
    checkAnswer,
    handleSelectedAnswer,
    
  }
}