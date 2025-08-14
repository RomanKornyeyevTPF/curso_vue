import heroes, { type Owner } from "../data/heroes";

export const getHeroById = (id: number) => {
  return heroes.find(hero => hero.id === id) || null;
}

console.log( getHeroById(2) );

const getHeroesByOwner = (owner: Owner) => {
  return heroes.filter(hero => hero.owner === owner);
}

console.log( getHeroesByOwner('Marvel') );