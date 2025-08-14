const originalQuotes = [
    { quote: 'The night is darkest just before the dawn. And I promise you, the dawn is coming.', author: 'Harvey Dent, The Dark Knight' },
    { quote: 'I believe what doesn’t kill you simply makes you, stranger.', author: 'The Joker, The Dark Knight' },
    { quote: 'Your anger gives you great power. But if you let it, it will destroy you… As it almost did me', author: 'Henri Ducard, Batman Begins' },
    { quote: 'You either die a hero or live long enough to see yourself become the villain.', author: 'Harvey Dent, The Dark Knight' },
    { quote: 'If you’re good at something, never do it for free.', author: 'The Joker, The Dark Knight' },
    { quote: 'Yes, father. I shall become a bat.', author: 'Bruce Wayne/Batman, Batman: Year One' },
]

const { createApp, ref, computed } = Vue;

const app = createApp({

  setup() {

    // array reactivo
    const quotes = ref(originalQuotes);

    // Contador de longitud
    const totalQuotes = computed (() => {
      return quotes.value.length;
    })

    // nuevo mensaje
    const newMessage = ref("");

    // mostrar / ocultar autores
    const showAuthor = ref(false);
    const textButtonAuthor = ref("Mostrar");
    const toggleAuthor = () => {
      showAuthor.value = !showAuthor.value;
      textButtonAuthor.value = (textButtonAuthor.value === "Mostrar") ? "Ocultar" : "Mostrar";
    }

    // añadir frases
    const addQuote = () => {
      // hace falta el .value porque quotes es un objeto reactivo y unshift/push es de arrays
      quotes.value.unshift({ quote: newMessage.value, author: "Roman" });

      newMessage.value = ""; // limpiar el input
    }

    return {
      quotes,
      totalQuotes,
      showAuthor,
      textButtonAuthor,
      toggleAuthor,
      addQuote,
      newMessage,
    }

  }

});

app.mount('#myApp');