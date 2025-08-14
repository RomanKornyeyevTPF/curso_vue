// console.log('inicio');

// new Promise( (resolve, reject) => {
//   console.log('Cuerpo de la promesa');

//   setTimeout(() => {
//     // resolve('Tenemos un valor');

//     reject('Tenemos un error');

//   }, 1000);
  

// })
//   .then( ( message ) => console.log( message ) )
//   .catch( errorMessage => console.warn( errorMessage ) )
//   .finally( () => console.log('Fin promesa') );

// console.log('fin');

import { getHeroById } from './07-imp-exp';
import type  { Hero } from '../data/heroes';

const getHeroByIdAsync = ( id: number ):Promise<Hero> => {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      const hero = getHeroById(id);

      hero ? resolve(hero) : reject(`Hero with id ${id} not found`);
        
    }, 1500);
  })
}

getHeroByIdAsync(1)
  .then( hero => console.log('Hero:', hero) )
  .catch( error => console.warn(error) );