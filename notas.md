# Notas
## JS / TS
### Generales
#### const / let / var
- var: no usar, es antiguo
- let: usar solo si tenemos claro que se va a cambiar el valor después
- const: usar prioritariamente const para evitar problemas con posibles mutaciones en imports. Ante la duda usar siempre const y cambiar a var si es necesario.

### Arrays/objetos
#### Mutabilidad
Cuando trabajamos con arrays y queremos duplicar un array, debemos hacer el spread [...variable]:

```js
const numberArray = [1, 2, 3, 4, 5];
numberArray.push(6);

const numberArray2 = [...numberArray];
console.log(numberArray2);

console.log({ numberArray, numberArray2 });
```

Si lo hiciesemos igualándolo (`const numberArray2 = numberArray;`), tendriamos el problema de que se nos mutaría el array original, debido a que los arrays se pasan como referencia. Hay que evitar hacer código mutable.

#### Tipado
TS se traspila posteriormente a JS. Por lo que tener un array de varios tipos de datos es posible (pero no siempre lo deseado o lo óptimo). En el ejemplo tenemos un array de números y le añadimos un string:

```js
const numberArray = [1, 2, 3, 4, 5];
numberArray2.push('7');
```

Esto arroja un array con todos los números y el último dato como string. Para evitar esto metemos un tipado como en cualquier otro lenguaje de tipado fuerte, pero con una sintáxisis un poco trambólica y se puede combinar perfectamente con spread y demás:

```js
[1, 2, 3, 4, 5];const numberArray2: (number|string)[] = [...numberArray];
```

### Funciones

#### Tipado

Las funciones también tienen tipado y por default, en una función cuando le pasas parámetros y no indicas el tipo, pone el tipo "any":

```js
function greetPerson(name) {
  return `Hello, ${name}!`;
}
```

Esto es igual a:

```js
function greetPerson(name: any) {
  ...
}
```

Esto debemos evitarlo para evitar errores y ponerle el tipado deseado (string en este caso):

```js
function greetPerson(name: string) {
  ...
}
```

#### Funciones flecha

Las míticas funciones flecha de js/ts. Función original y función flecha:

```js
function greetPerson(name: string) {
  return `Hello, ${name}!`;
}

const greetPerson = (name: string) => {
  return `Hello, ${name}!`;
}
```

Si el cuerpo de la función es solamente un return corto, podemos hacer esto y funciona exactamente igual, acortando la sintáxis:

```js
const greetPerson = (name: string) => `Hello, ${name}!`;
```

Para retornar objetos / arrays, el return se indica con paréntesis `({})`:

```js
const getUser = () => ({
  uid: "ABC-123",
  username: "Roman001",
})
```

#### Undefined

Los objetos en ts pueden tener valores undefined, por ejemplo, aquí vemos como en el primer objeto no existe "power", pero en el segundo sí:

```js
const heroes = [
  {
    id: 1,
    name: 'Batman',
  },
  {
    id: 2,
    name: 'Superman',
    power: 'Super fuerza',
  },
];
```

Si posteriormente queremos buscar un objeto por el id (por ejemplo), podemos usar una función nativa de js `find`:

```js
const hero = heroes.find( (h) => h.id === 1 );
```

IMPORTANTE: tenemos que tener ojo con donde lo pintamos o donde lo metemos. Ya que a veces puede dar nulos. Para esto usaríamos un indicador para decir que podríamos recibir undefined `?`:

```js
console.log(hero?.name);
```

Esto es especialmente útil cuando sabemos que no todos los objetos van a ser iguales o si tenemos dudas de ello. Ante la duda, para evitar errores en el código, deberíamos usar este indicador.

### Objetos

#### Desestructuración

Se puede desestructurar un objeto para acceder únicamente a los valores que nosotros queramos, por ejemplo:

```js
export const person = {
  name: 'Tony',
  age: 45,
  codeName: 'Ironman',
}
```

Se desestructuraría así:

```js
const { age, name, power = 'No tiene poder' } = person;
```

Como vemos aquí añadimos un valor opcional que no siempre va a aparecer (power), pero esto luego da errores de compilación. Una forma de solucionarlo es haciendo una interfaz:

```js
interface Hero {
  name: string;
  age: number;
  codeName: string;
  power?: string; // Propiedad opcional
}
```

La cual aplicamos en el objeto y ya funcionaría todo:

```js
export const person: Hero = {
  name: 'Tony',
  age: 45,
  codeName: 'Ironman',
}

const { age, name, power = 'No tiene poder' } = person;
console.log({ age, name });
```

Lo mismo se aplica a funciones que crean objetos:

```js
interface CreateHeroArgs {
  name: string;
  age: number;
  codeName: string;
  power?: string; // Propiedad opcional
}

const createHero = ({name, age, codeName, power}: CreateHeroArgs) => ({
  id: 123,
  name: name,
  age: age,
  codeName: codeName,
  power: power ?? 'No tiene poder',
})

console.log( createHero( person ));
```

### Importaciones / exportaciones

Cuando tu haces una importación normal en js, normalmente te importa lo que se exporta por default en el módulo que estés importando:

```js
import cualquierCosaDefault from '../data/heroes';
```

Normalmente conviene poner el mismo nombre que el default que se exporta. También se pueden hacer importaciones mixtas, default + desestructuración:

```js
import heroes, { owners } from '../data/heroes';
```

<hr>

### APIs

Cuando queramos hacer una interfaz para un json copiado de una API, hacemos:

1. Consulta con Postman (o similar)
2. Copiamos el JSON
3. En VSCode ponemos ctrl + shift + P
4. Buscamos paste json..., damos click al primer resultado
5. Ponemos el nombre principal y pegamos

Esto nos genera una interfaz completa en base al JSON, puede contener errores, pero suele ser precisa. Para esto nos hacen falta estas extensiones:

- (extensión) Paste JSON as code
- (app) Postman / Insomnia / Bruno

<hr>

## Vue

### Aclaraciones

#### 1
Normalmente en script (ts) ponemos `nombreConstante.value`. Pero en el template (HTML) no es necesario. Vue desenvuelve los valores por defecto, por lo que podemos acceder a ellos con `{{nombreConstante}}` (sin el .value).

#### 2
El atributo setup en `<script lang="ts" setup>` indica que el componente Vue usa la Composition API (lo moderno) con sintaxis simplificada. Permite declarar variables, funciones y composables directamente en el script, haciéndolos accesibles en el template sin necesidad de retornar explícitamente. Facilita la organización y reutilización de lógica en componentes Vue 3.

### Atajos
#### Onclick / v-on:click
En vue un event listener de onclick se escribe como `v-on:click="nombreFuncion"`.<br>
Pero esto se puede abreviar a `@click="nombreFuncion"`.

### Referencias reactivas

Para hacer referencias reactivas en vue, no nos vale con poner una variable con const, deberemos darle un ref(), para que detecte un cambio y lo haga efectivo.
También al ser constante, no nos deja cambiarlo, para eso lo manejamos como si fuese un objeto, cambiando el .value:

```js
const { createApp, ref } = Vue;

const app = createApp({
  template: `
    <h1>{{message}}</h1>
    <p>Desde app js</p>
  `,

  setup() {
    const message = ref('Hola Vue.js!');

    setTimeout(()=>{
      message.value = 'El mensaje ha cambiado!';
    }, 1500)
    
    return { message };
  }
});

app.mount('#myApp');
```

### Estilos
#### General
Cuando hacemos un componente SFC (Single File Component), podemos poner un bloque estilo que solamente afecte a ese componente, con el atributo scoped:

```html
<template>
  <h1>hola mundo</h1>
</template>

<script lang="ts" setup>
  console.log( "hola mundo" )
</script>

<style scoped>
  h1{color: green;}
</style>
```

El color se está aplicando a todos los H1, pero como el `<style>` tiene scoped, solo aplica a este componente.

### v-*

#### v-on
Sirve para **escuchar eventos** en elementos del DOM.  
Sintaxis completa: `v-on:evento="funcion"`  
Sintaxis abreviada: `@evento="funcion"`

```html
<button v-on:click="hacerAlgo">Haz algo</button>
<button @click="hacerAlgo">Haz algo</button>
```

#### v-show
Sirve para mostrar u ocultar un elemento mediante display: none.
El elemento sigue presente en el DOM, solo cambia su visibilidad.

```html
<p v-show="visible">Esto se ve solo si visible es true</p>
```
- true → se muestra
- false → display: none

#### v-if
Sirve para renderizar o no un elemento en el DOM.
Si la condición es false, el elemento no existe en el DOM.

```html
<p v-if="visible">Esto se renderiza solo si visible es true</p>
```
- true → se crea el elemento
- false → no existe en el DOM

#### v-model
Sirve para enlazar datos en dos direcciones (two-way binding) entre un valor de JavaScript y un elemento de formulario.
Cuando el usuario cambia el valor en el formulario, la variable de Vue también cambia, y viceversa.

```html
<input v-model="nombre">
<p>Hola, {{ nombre }}</p>
```

También se puede usar en un script con un ref(nombre).

### Comunicación de componentes
#### v-bind

Para **pasar datos o atributos** a un elemento o componente en Vue, se usa la directiva `v-bind`.  
Permite enlazar un atributo HTML a una expresión o variable de Vue. Puede aplicarse a cualquier atributo (`id`, `class`, `href`, `src`, etc.).

Normalmente no se escribe `v-bind` completo, sino que se usa su forma abreviada `:`:

```html
<MyCounter :value="5" />
```

Esto se pondría en el componente padre.

#### defineProps()

Padre ---> hijo.<br>
Se usa en un componente hijo para declarar las props que puede recibir desde su componente padre. Recoge el `:value`.<br>
En el componente hijo, dentro del script:

```js
const props = defineProps({
  value: { type: Number, required: true }
});
```

Pero al usar TS, podemos poner un código más "refinado", similar a como se haría en react:

```ts
const props = defineProps<{
  value: number;
}>();
```

Y para rizar el rizo y definirlo con una interfaz, para tenerlo más modularizado y limpio, quedaría así:

```ts
interface Props {
  value: number;
}

const props = defineProps<Props>();
```

* Como en las demás interfaces, se puede poner ese valor como opcional con `?`: `value?: number`.

En options (script sin setup) se vería así: 

```js
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
```

Esto nos puede interesar cuando el código crezca mucho.

#### defineEmits()

Hijo ---> padre.<br>
Se usa en un componente hijo para declarar los eventos que puede emitir hacia su componente padre.