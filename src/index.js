import './css/styles.css';
import { debounce } from "debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


console.log(input);
input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));


function onInputChange() {
    const userInput = input.value.trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
if (userInput) {
    fetchCountries(userInput)
    .then(inputProcess)
    .catch(error => {
        Notify.failure('Oops, there is no country with that name')
    });
}

function inputProcess (name) {
if (name.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
}
markup(name);
}

function markup (data) {
    const markupData = data
      .map(({ flags: { svg }, name: { official } }) => {
        return `<li> <h1> <img src="${svg}" alt="${official}" width="30"/> ${official}</h1></li>`;
      })
      .join('');
      if (data.length === 1) {
        const languages = Object.values(data[0].languages).join(', ');
  
        const markupInfo = `<ul>
        <li>Capital: ${data[0].capital}</li>
        <li>Population: ${data[0].population}</li>
        <li>Languages: ${languages}</li>
        </ul>`;
  
        countryInfo.insertAdjacentHTML('afterbegin', markupInfo);
      }
      return countryList.insertAdjacentHTML('afterbegin', markupData);

}
}


