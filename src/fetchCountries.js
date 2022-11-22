
const BASE_URL = 'https://restcountries.com/v3.1/name';
const SEARCH_OPTIONS = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?fields=${SEARCH_OPTIONS}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}


