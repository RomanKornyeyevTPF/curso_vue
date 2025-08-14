const person = {
  name: 'Roman',
  age: 30,
  address: {
    city: 'New York',
    zip: 51323,
    lat: 14.232323,
    lng: 34.5667
  }
};

const person2 = structuredClone(person);
