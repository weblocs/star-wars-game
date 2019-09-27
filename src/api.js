const API = "https://swapi.co/api/people/";

function fetchRandomPerson(param) {
  let min = 1;
  let max = param;
  let random = Math.round(min + Math.random() * (max - min));

  return fetch(API + random.toString(), {
    method: "GET"
  }).then(response => response.json());
}

export default fetchRandomPerson;
