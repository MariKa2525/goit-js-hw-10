import './css/styles.css';
import {fetchCountries} from './fetchCountries.js'
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY))

function onInputValue(evt) {
    evt.preventDefault();
    const valueInp = evt.target.value
    
    fetchCountries(valueInp).then(data => showData(data))
}

function showData(arrData) {
    if (arrData.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (arrData.length >= 2 && arrData.length <= 10) {                
        const newA = createCountriesList(arrData)
    } else {
        const card = createCountyList(arrData[0])
        renderCountry(card)
    }        
}

    function createCountyList({name, capital, population, flags, languages }) {
        return `
        <li>
        <span><img src="${flags.svg}" widht=50 height=30</span>
        <span>Name: ${name} </span>
        <span>Capital: ${capital} </span>
        <span>Population: ${population} </span>
        <span>Languages: ${languages} </span></li>
        `
    }
    function createCountriesList(arrData) {
        
        const newA = arrData.map(({name, flags}) => {
            return `<li><img src="${flags.svg}" widht=50 height=30 </li>
            <li>Name:${name}</li>`
        })
    renderCountry(newA.join(''))
    }

    function renderCountry(countries) {
        countryList.innerHTML = ''
        countryList.style.listStyle = 'none'
        countryList.insertAdjacentHTML('afterbegin', countries);
    }





//===========================================================
// const DEBOUNCE_DELAY = 300;

// const inputEl = document.querySelector('#search-box');
// const divInfo = document.querySelector('.country-info');


// function fetchCountries() {
//     let countryName = divInfo.value
//     let url = `https://restcountries.com/v3.1/name/${countryName}`
//     Notiflix.Notify.info(countryName)
//     console.log(countryName)
//     return fetch(url)
// .then(response => {
//     if (response.ok) return response.json();
//     throw new Error(response.status)
// })
// .then(data => {
//     app(data)
//     console.log(data)
// })
// .catch(error => {
//     console.log(error)
// })

// }

// function app(data) {
    
//     inputEl.addEventListener('input', onInputValue)
    
//     function onInputValue(evt) {
//         evt.preventDefault();
//         const valueInp = evt.target.value
//         console.log(valueInp)

//         const dataFilter = data.filer(({name}) => {
//             return name.indexOf(valueInp) >= 0
//         })
//         showData(dataFilter)
//     }

//     // name.official, capital, population, flags.svg, languages

//     function createMarkup({name, capital, population, flags, languages }) {
//         return `
//         <div><span>${name.official}</span>
//         <span>${capital}</span>
//         <span>${population}</span>
//         <span>${flags.svg}</span>
//         <span>${languages}</span>
//         </div>
//         `
//     }
//     function showData(arrData) {
//         divInfo.innerHTML = ''
//         divInfo.insertAdjacentHTML('afterbegin', arrData.map(data => createMarkup(data)))
//     }
// }

//----------------------------const inputEl = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');

// inputEl.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY))

// function fetchCountries(name) {
// return fetch(`https://restcountries.com/v2/name/${name}`)
// .then(response => {
//     if (response.ok) return response.json();
//     throw new Error(response.status)
// })

// }



// function onInputValue(evt) {
//     evt.preventDefault();
//     const valueInp = evt.target.value
//     console.log(valueInp)

//     fetchCountries(valueInp)
//     .then(data => {
//         showData(data)
//         console.log(data)
//     })
//     .catch(error => {
//         console.log(error)
//     })
// }

//     function createMarkupList({name, capital, population, flags, languages }) {
//         return `
//         <li>
//         <span><img src="${flags.svg}" widht=50 height=30</span>
//         <span>Name: ${name} </span>
//         <span>Capital: ${capital} </span>
//         <span>Population: ${population} </span>
//         <span>Languages: ${languages} </span></li>
//         `
//     }

//     function createCountriesList({name, flags}) {
//         return `
//         <span><img src="${flags.svg}" widht=50 height=30 </span>
//         <span>Name:${name.official}</span>
//         `
//     }

//     function renderCountry(countries) {
//         countryList.innerHTML = ''
//         countryList.insertAdjacentHTML('afterbegin', countries.map(data => createCountriesList(data)))
//     }

//     function showData(arrData) {
//         if (arrData.length > 10) {
//             Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
//             } else if (arrData.length > 2 && arrData.length > 10) {
//                 renderCountry(arrData)
//             } else {
//                 countryList.insertAdjacentHTML('afterbegin', arrData.map(data => createMarkupList(data)))
//             }        
//     }