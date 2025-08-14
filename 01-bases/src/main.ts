import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'

// import './bases/01-const-let.ts';
// import './bases/02-object.ts';
// import './bases/03-arrays.ts';
// import './bases/04-functions.ts';
// import './bases/05-deses-obj.ts';
// import './bases/06-deses-arr.ts';
// import './bases/07-imp-exp.ts';
// import './bases/08-promises.ts';
// import './bases/09-fetch-api.ts';
// import './bases/10-axios.ts';
import './bases/11-async-await.ts';


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
  </div>
`

