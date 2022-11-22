import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import templatesCountries from './templates/Countries.hbs';
import templatesOneCountry from './templates/Country.hbs';

const DEBOUNCE_DELAY = 500;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCountriesInfo, DEBOUNCE_DELAY));

function searchCountriesInfo(event) {
  const countryName = event.target.value.trim();

  if (!countryName) {
    onClearPage();
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length === 1) {
        onCountryInfoMarkup(countries);
      } else if (countries.length > 10) {
        Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
        onClearPage();
      } else {
        onCountryListMarkup(countries);
      }
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
      onClearPage();
    });
}

function onCountryInfoMarkup(arrOfCountries) {
  const oneCountry = arrOfCountries[0];
  oneCountry.languages = Object.values(oneCountry.languages).join(', ');
  oneCountry.capital = oneCountry.capital.join(', ');
  const countryInfoMarkup = templatesOneCountry(oneCountry);

  countryList.innerHTML = '';
  countryInfo.innerHTML = countryInfoMarkup;
}

function onCountryListMarkup(arrOfCountries) {
  const countryListMarkup = arrOfCountries
    .map(el => {
      return templatesCountries(el);
    })
    .join('');

  countryInfo.innerHTML = '';
  countryList.innerHTML = countryListMarkup;
}

function onClearPage() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}