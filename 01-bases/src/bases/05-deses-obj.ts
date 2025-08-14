interface Hero {
  name: string;
  age: number;
  codeName: string;
  power?: string; // Propiedad opcional
}

export const person: Hero = {
  name: 'Tony',
  age: 45,
  codeName: 'Ironman',
}

// const { age, name, power = 'No tiene poder' } = person; // Puede ser un objeto o un array
// console.log({ age, name });

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