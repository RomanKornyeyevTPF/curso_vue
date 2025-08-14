
const { createApp, ref } = Vue;

const app = createApp({
  // template: `
  //   <h1>{{message}}</h1>
  //   <p>{{author}}</p>
  // `,

  setup() {
    const message = ref('Hola Vue.js!');
    const author = ref('Roman Kornyeyev');

    const changeMessage = () => {
      message.value = 'El mensaje ha cambiado!';
      author.value = 'El autor también ha cambiado!';
    }

    // setTimeout(() => {
    //   message.value = 'El mensaje ha cambiado!';
    //   author.value = 'El autor también ha cambiado!';
    // }, 1500)

    return {
      message,
      author,
      changeMessage
    };
  }
});

app.mount('#myApp');