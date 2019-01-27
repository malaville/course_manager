console.log("destructuring");
const person = {
  name: "Drive",
  age: 14,
  location: { city: "Paris", temp: 2 }
};

const { name = "Anonymous", age } = person;

console.log(`${person.name} is ${person.age} y.o.`);
console.log(`${name} is ${age} y.o.`);

const { temp, city } = person.location;
if (city && temp) {
  console.log(`It's ${temp}°C in ${city}`);
}
