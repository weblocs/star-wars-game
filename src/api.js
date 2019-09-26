const API = "https://swapi.co/api/people/";

function fetchAPI(param) {
  return fetch(API + param.toString(), {
    method: "GET",
    headers: new Headers({})
  }).then(response => response.json());
}

export default fetchAPI;
