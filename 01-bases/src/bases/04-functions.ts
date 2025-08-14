function greetPerson(name: string) {
  return `Hello, ${name}!`;
}

const getUser = (uid: string) => ({
  uid: "ABC-123",
  username: "Roman001",
})

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

const hero = heroes.find( (h) => h.id === 1 );

console.log(hero?.name);