# Notas y apuntes

## ERRORES GLOBALES (GENERAL)
### rollup (vue-node-npm)
En proyectos nuevos de Vue, las versiones recientes de Rollup pueden priorizar binarios precompilados en lugar del fallback JS, lo que a veces activa el antivirus (especialmente en entornos corporativos donde no se puede añadir excepciones).

Se pueden aplicar varias soluciones:

1. **Usar versiones anteriores estables (FUNCIONA)** 

    Ejecutar en el proyecto:  
    ```shell
    npm install -D vite@7.1.2 rollup@4.46.2
    ```
    Esta versión reciente (a fecha 21/08/2025 es casi la última) prioriza el fallback JS y evita problemas con el antivirus.

2. **Forzar fallback JS (NO PROBADA)**

    Ejecutar en PowerShell o CMD:
    ```shell
    set ROLLUP_SKIP_NODEJS_NATIVE=true
    ```
    Esto afecta solo a la sesión actual de terminal y fuerza a Rollup a usar JS en lugar de binarios.


## JS / TS
### Generales
#### const / let / var
- var: no usar, es antiguo
- let: usar solo si tenemos claro que se va a cambiar el valor después
- const: usar prioritariamente const para evitar problemas con posibles mutaciones en imports. Ante la duda usar siempre const y cambiar a var si es necesario.

#### Imports
En TypeScript, `import` se usa para cosas que existen en tiempo de ejecución (clases, enums, funciones, objetos), es decir, cosas que existen en js.  
`import type` se usa solo para tipos (`interface`, `type`), que desaparecen al compilar a JavaScript. Son cosas que no existen como tal en js.

Cuando importamos un paquete de una librería que tenga icono de DT, seguramente al instalarlo, tengamos que ejecutar un comando más. Ejemplo: `canvas confetti`.

```shell
npm i canvas-confetti
```

Al importarlo, saldrá este error, por algo de TS y compilación:

```js
import confetti from 'canvas-confetti'; 
// Could not find a declaration file for module 'canvas-confetti'. 'c:/Users/roman.kornyeyev/Downloads/curso_vue/curso_vue/04-pokemon-game/node_modules/canvas-confetti/src/confetti.js' implicitly has an 'any' type.
// Try `npm i --save-dev @types/canvas-confetti` if it exists or add a new declaration (.d.ts) file containing `declare module 'canvas-confetti';`
```

En estos casos ejecutamos el comando que nos sugiere:

```shell
npm i --save-dev @types/canvas-confetti
```

#### ES2022 / métodos modernos (ej: '.at')
métodos modernos como `.at()` (para arrays y strings) no existen en ES2019/ES2020 porque se introdujeron en **ES2022**. Solo en ES2022+ los arrays y strings soportan este método nativamente. Para ello deberemos poner en nuestro `ts.config.app.json` lo siguiente:

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",

    "paths": {
      "@/*": ["./src/*"]
    },

    // código añadido para poder usar métodos modernos como '.at' en strings y arrays
    "target": "ES2022",
    "lib": ["ES2022", "DOM"]
  }
}
```

Debido a que la versión de 2019 no tiene

#### Alias

En JS / TS existen alias a la hora de importar un objeto desestructurado. Digamos que tenemos varios objetos que se llaman de una forma muy similar:

```js
import PokemonOptions from '../components/PokemonOptions.vue';
const { pokemonOptions } = usePokemonGame();
```

JS es case sensitive y distingue las 2 variables. Pero esto nos puede generar ruido visual y confusiones. Para evitar esto, podemos usar los alias:

```js
const { pokemonOptions:options } = usePokemonGame();
```

Y ahora nuestra variable pasaría a llamarse `options`. Esto puede ayudar a evitar confusiones.


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

### --- ERRORES ---

#### ERROR TAILWIND DIRECTIVA @APPLY
Al instalar tailwind, al contrario de lo que se muestra en el vídeo (tailwind 3), nosotros estaremos usando tailwind 4. Por lo que cambian algunas cosas. Entonces, si queremos usar `@apply` entre otros, por ejemplo en un componente:

```html
<style scoped>
  .btn{
    @apply bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded;
  }
</style>
```
Nos dará error, por lo que se deberá hacer un `@reference` a la hoja principal de css (donde está el import) desde el propio componente. Y adicionalmente nos interesará meter un atributo `scoped` en el `<style>`, para que estos estilos se apliquen solamente a este componente. quedando así:

```html
<style scoped>
  @reference "../style.css";

  .btn{
    @apply bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded;
  }
</style>
```

O bien, todos los `@apply` deberán ir en el `style.css` general (donde está el `@import "tailwindcss";`).





### --- FIN ERRORES ---

### Aclaraciones

#### 1 - Props, nomenclaturas
Normalmente en script (ts) ponemos `nombreConstante.value`. Pero en el template (HTML) no es necesario. Vue desenvuelve los valores por defecto, por lo que podemos acceder a ellos con `{{nombreConstante}}` (sin el .value). En este caso sería para printearlos.

También a la hora de bindearlos: los **props se definen en `camelCase` en el componente padre/hijo**,  
pero en los **templates se pasan normalmente en `kebab-case`** (convención común).

Es decir:

```html
<!-- Llamada al componente hijo desde el padre -->
<PokemonOptions
  ...
  :selected-answer="..."
/>
```

```js
// Componente hijo (js)
interface Props {
  ...
  selectedAnswer: number | null;
}
```

Vue hace la conversión automáticamente, por lo que ambos funcionan. Esto es una convención común.

OTRO PUNTO a aclarar es en cómo se reciben los props y cómo se pueden usar. Por ejemplo, si se reciben así:

```js
defineProps<Props>();
```

Aquí no guardas props en una constante, pero Vue hace un truco en `<script setup>`:
Los props que defines se “inyectan” directamente como variables reactivas en el template. Por eso puedes hacer:

```html
<Elemento
  ...
  v-for="{name, id} in options"
  :disabled="blockSelection === true"
/>
```

Y funciona, porque Vue expone automáticamente options, blockSelection, correctAnswer, selectedAnswer al template.

Pero en el `<script setup>` no los puedes usar directamente en código de JS.
Por ejemplo, si ahí intentaras:

```js
console.log(options.length);
```

Te daría error, porque fuera del template no están definidas.

En tu PokemonStats.vue<br>
Aquí necesitas usar los props en código JS (computed).
Cuando haces cálculos, Vue no te expone las props “mágicamente”, tienes que obtenerlas:

```js
const props = defineProps<Props>();

const porcentajeCorrectAnswers = computed(() => {
  const total = props.correctAnswers + props.wrongAnswers;
  return total === 0 ? '0.00' : ((props.correctAnswers / total) * 100).toFixed(2);
});
```

Resumen:

Template: puedes usar los nombres de props directamente sin props. gracias a la magia de `<script setup>`.

Script (JS/TS): si quieres usarlos en código (computed, funciones, watchers, etc.), necesitas capturarlos en una variable con `const props = defineProps<Props>()`.

Dicho de otro modo:

En PokemonOptions no te dio problema porque solo los usaste en el template.

En PokemonStats sí lo necesitas porque los estás usando en código JavaScript dentro del `<script>`.

#### 2 Script setup, composition API
El atributo setup en `<script lang="ts" setup>` indica que el componente Vue usa la Composition API (lo moderno) con sintaxis simplificada. Permite declarar variables, funciones y composables directamente en el script, haciéndolos accesibles en el template sin necesidad de retornar explícitamente. Facilita la organización y reutilización de lógica en componentes Vue 3.

```html
<!-- Componente padre -->
<ChatBubble :its-mine="true" message="hola mundo" />
```

```html
<!-- Componente hijo -->
<script setup lang="ts">
defineProps<{
  itsMine: boolean
  message: string
}>()
</script>
```

#### 3 Instalación tailwind
A la hora de instalar tailwind, no nos sale la opción para instalarlo en vue. Seguimos los pasos para instalarlo con vite, ya que vue está basado en vite o algo así.
A día de hoy el comando para instalar tailwind es:

```bash
npm install tailwindcss @tailwindcss/vite
```

> **Nota:**
> Pero puede cambiar en un futuro, es recomendable consultar la página oficial de tailwind.

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

#### Bindeos (v-bind)

En Vue, `v-bind` sirve para pasar valores dinámicos a props o atributos.  
Su forma abreviada es `:`.

```html
<!-- Forma larga -->
<ChatBubble v-bind:its-mine="true" />

<!-- Forma corta (más común) -->
<ChatBubble :its-mine="true" />
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

<hr>

### Reactividad, setup, defineComponents (IMP)
#### 3 Setup y defineComponent (IMP)
Para crear reactividad en un componente o script (ej: ref, etc.) se usa "setup" ¿Qué es? En Vue 3, la Composition API introduce la función setup() ¿Qué es? Es un método, este método es el punto de entrada donde declaras props, reactividad, computed, métodos, composables, etc.

Y se puede hacer de 2 maneras:

1. `<script setup>` (forma moderna):

    ```html
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
    import { useCounter } from '../composables/useCounter';

    interface Props {
      value: number;
    }

    const props = defineProps<Props>();
    const { counter, squareCounter } = useCounter(props.value);
    </script>
    ```

    - No se necesita export default ni definir explícitamente setup().

    - Todo lo que declares dentro del bloque ya está disponible en el template.

    - Ideal para proyectos nuevos: sintaxis más limpia y directa.

    - defineProps y defineEmits se usan directamente para props y eventos.

2. `setup()` dentro de defineComponent (forma clásica):

    ```html
    <script lang="ts">
    import { defineComponent } from 'vue';
    import { useCounter } from '../composables/useCounter';

    export default defineComponent({
      props: {
        value: { type: Number, required: true }
      },
      setup(props) {
        const { counter, squareCounter } = useCounter(props.value);
        return { counter, squareCounter };
      }
    });
    </script>
    ```

    - Requiere export default defineComponent({...}).

    - `setup(props)` se define explícitamente y se debe hacer return de todo lo que se quiere usar en el template.

    - Más verboso, pero compatible con opciones clásicas de Vue.


> **Nota:**  
> Solo se puede utilizar un setup por componente. NO PUEDEN HABER VARIOS.

<hr>

### v-*, eventos

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

También se puede utilizar en un `v-for`, para enlazar automáticamente las claves de un objeto, de la siguiente manera:

```html
<div class="flex flex-col space-y-2">
  <ChatBubble
    v-for="message in messages"
    :key="message.id"
    v-bind="message" 
  />

    <!-- v-bind hace el mapeo automático de claves, equivalente a: -->
    <!--
    :its-mine="message.itsMine"
    :message="message.message"
    :image="message.image"
    -->
    <!-- ***Estas claves son iguales en ambos componentes
    y vienen de una interfaz -->

</div>
```

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

Con `defineEmits` se definen los eventos que un componente puede **emitir** hacia su padre.  
Se pueden tipar para mayor seguridad en TypeScript.

```html
<script setup lang="ts">
const emit = defineEmits<{
  sendMessage: [text: string];
}>();

function submit() {
  emit("sendMessage", message.value);
}
</script>
```

En el padre, se escucha el evento con v-on o su abreviado @:

```html
<!-- Forma larga -->
<ChatInput v-on:send-message="handleMessage" />

<!-- Forma corta (más común) -->
<ChatInput @send-message="handleMessage" />
```

`defineEmits` se monta cuando el componente se inicializa.

Eso te devuelve la función emit.

Luego, cuando dentro de tu componente llamas a emit("sendMessage", valor), se lanza el evento sendMessage.

El padre escucha ese evento con @send-message="miFuncion", y ahí es donde se ejecuta tu lógica.

> RESUMEN DE FLUJO

> **Componente hijo**
> 1. Declara los eventos con `defineEmits`.
> 2. Cuando ocurre algo (ej: un `click`), llama a `emit("evento", datos)`.

> **Componente padre**
> 1. Escucha el evento con `@nombre-evento="funcion"`.
> 2. Ejecuta la función correspondiente (ej: hacer `push` en un array).
> 3. Como el array es **reactivo**, la vista se actualiza automáticamente (ej: la lista de mensajes).

### Router

#### Carga perezosa (lazy load)

Tras instalar el router nos hace falta modificar el main.ts:

```ts
...
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

Con esto el router ya es parte global de la aplicación.

Al cambiar de ruta en el router de vue, existe una carga perezosa (los componentes se cargan solo cuando son necesarios). Aquí hay un ejemplo de las dos formas, en el archivo `src/router/index.ts`:

```js
import HomePage from "@/modules/landing/pages/HomePage.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // Eager-loaded (not lazy, always in the bundle)
      component: HomePage,
    },
    {
      path: "/features",
      name: "features",
      // Lazy-loaded
      component: () => import("@/modules/landing/pages/FeaturesPage.vue"),
    },
  ],
});

export default router;
```

#### Diferencia entre createWebHashHistory y createWebHistory

- **`createWebHashHistory`**  
  - URL: `/#/ruta`  
  - Pros: Funciona en cualquier servidor  
  - Contras: URL con `#`, menos limpia

- **`createWebHistory`**  
  - URL: `/ruta`  
  - Pros: URLs limpias y amigables  
  - Contras: Requiere configuración del servidor para redirigir todas las rutas a `index.html`

#### Rutas Padres vs Rutas Hijas

En Vue Router, las rutas pueden ser **padres** o **hijas**:

- **Rutas padres**:
  - Definen un layout o contenedor común.
  - Pueden tener **children**, que son las rutas hijas.
  - Ejemplo:  
    ```js
    {
      path: "/",
      name: "landing",
      component: LandingLayout, // Layout principal
      children: [ ... ]
    }
    ```

- **Rutas hijas**:
  - Se renderizan dentro del `<router-view>` del padre.
  - Su path se concatena con el path del padre.
  - Pueden ser lazy-loaded o eager-loaded.
  - Ejemplo:
    ```js
    {
      path: "/features",
      name: "features",
      component: () => import("FeaturesPage.vue") // Lazy-loaded
    }
    ```

**Nota:**  
- Si el padre tiene `path: "/"` y un hijo tiene `path: "/features"`, la ruta completa será `/features`.
- Los hijos heredan la estructura del layout del padre.

#### Redirecciones, 404, Login, bloqueo de retroceso.

##### Not found 404

Cuando nuestro usuario salta a una ruta que no existe, debe saltar una excepción 404 y llevarlo a una página que le diga
que esa ruta no existe y que tenga un botón de volver a inicio (una típica view 404).
Para esto nos serviría el siguiente código dentro de nuestras rutas:

```js
// Not found 404
{
  path: '/:pathMatch(.*)*', // Cualquier ruta que no coincida con las anteriores
  name: 'NotFound',
  component: NotFound404, // Edger-loaded (not lazy, always in the bundle)
},
```

En este caso nos puede interesar tener la 404 siempre cargada, ya que es una situación relativamente común que puede saltar en cualquier momento. Pero se puede poner como lazy loaded también.

Al saltar la 404 y darle al botón "volver al inicio", no nos interesa que el usuario pueda retroceder a la misma 404. Por lo tanto, tenemos que "bloquear" esa ruta para prevenir que se pueda retroceder a la misma. Esto se puede hacer mismamente en el template con un `RouterLink`:

```html
<!-- replace es para que no pueda volver atrás (al 404) -->
<RouterLink
  replace
  class="..."
  :to="{ name: 'home' }"
>
  Back to homepage
</RouterLink>
```

##### Login y redirect

Nos pasa un poco lo mismo en el login. Una vez que el user ha hecho inicio de sesión correcto nos interesa redirigirle a una página privada (inicio, perfil, etc.), pero no nos interesa que pueda retroceder al mismo login. Esto se puede bloquear también.

En el script del componente o en el composable, se puede manejar esto con vue router de la siguiente forma

```html
<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const onLogin = () => {
  router.replace({ name: 'home' }); // con replace evitamos que pueda volver al login
};
</script>
```

#### Protección de rutas

Podemos hacer la típica protección de rutas bajo logueado. Dentro de nuestro router pondríamos lo siguiente:

```js
{
  path: '/pokemon/:id',
  name: 'pokemon',
  beforeEnter: [ isAuthenticatedGuard ], // protegemos la ruta
  props: ( route ) => {
    const id = Number( route.params.id );

    return isNaN( id ) ? { id: 1 } : { id };
  },
  component: () => import('@/modules/pokemons/pages/PokemonPage.vue'),
}
```

Esto llama a un guard que habremos importado en el script. Este guardia hará unas comprobaciones antes de permitir el acceso. En este caso es un local storage para el ejemplo pero será un `jwt` en un futuro. Adicionalmente guardamos la ruta anterior para redirigir al user al loguearse.
Cuando haya un backend contra el que autentificarse, la función se podrá poner como `async`.

```js
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const isAuthenticatedGuard = async (
  to:RouteLocationNormalized,
  from:RouteLocationNormalized,
  next:NavigationGuardNext
) => {
  const userId = localStorage.getItem('userId');
  localStorage.setItem('lastPath', to.path); // guardo la última ruta a la que ha intentado acceder

  if (!userId) {
    return next({ name: 'login' });
  }

  return next();
}

export default isAuthenticatedGuard;
```

Esto sería un ejemplo de llamada desde el login:

```html
<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const onLogin = () => {
  localStorage.setItem('userId', 'ABC-123');

  const lastPath = localStorage.getItem('lastPath') ?? '/';

  router.replace(lastPath);
};
</script>
```


### Testing
XD