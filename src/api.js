function fetchRandomPerson(max, compareData) {

  let API = "https://swapi.co/api/" + compareData + "/";

  let min = 1;
  let random = Math.round(min + Math.random() * (max - min));

  return fetch(API + random.toString(), {
    method: "GET"
  })
  .then(response => response.json());
}

export default fetchRandomPerson;
