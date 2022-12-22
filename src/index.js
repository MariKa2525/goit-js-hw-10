import './css/styles.css';
import {fetchCountries} from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function onInputValue(evt) {
    evt.preventDefault();
    const valueInp = evt.target.value;

    if (valueInp === '') {
        countryList.textContent = ''
        return
    }
    
    fetchCountries(valueInp.trim()).then(data => showData(data))
    .catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name")
    });
}

function showData(arrData) {
    if (arrData.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (arrData.length >= 2 && arrData.length <= 10) { 
        countryList.innerHTML = ''               
        const newA = createCountriesList(arrData);
    } else {
        countryList.innerHTML = ''
        const card = createCountyList(arrData[0]);
        renderCountry(card);
    }        
}

    function createCountyList({name, capital, population, flags, languages }) {
        return `
        <li style="display: flex; flex-direction: column; align-items: flex-start;">
        <img src="${flags.svg}" widht=90 height=90>
        <span>Name: ${name} </span>
        <span>Capital: ${capital} </span>
        <span>Population: ${population} </span>
        <span>Languages: ${languages[0].name} </span></li>
        `
    }

    function createCountriesList(arrData) {
        
        const newA = arrData.map(({name, flags}) => {
            return `<li><img src="${flags.svg}" widht=50 height=30 </li>
            <span>Name:${name}</span>`
        });
        renderCountry(newA.join(''));
    }

    function renderCountry(countries) {
        
        countryList.style.display = "flex";
        countryList.style.flexDirection = "column";
        countryList.style.fontSize = "24px";
        countryList.style.listStyle = 'none';
        countryList.style.gap= "30px";

        countryList.insertAdjacentHTML('afterbegin', countries);
    }