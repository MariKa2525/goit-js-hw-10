import Notiflix from 'notiflix';

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/name/${name}`)
    .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.status)
    })
}
    
