const searchBox = document.querySelector(".search");
searchBox.addEventListener("change", displayMatches);
searchBox.addEventListener("keyup", displayMatches);
const suggestions = document.querySelector(".suggestions");

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    let regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches(e){
  let matchedArr = findMatches(e.target.value, cities);
  
  let list = matchedArr.map((value) => {
    let regex = new RegExp(e.target.value, "gi");
    let cityName = value.city.replace(regex, `<span class="hl">${e.target.value}</span>`);
    let stateName = value.state.replace(regex, `<span class="hl">${e.target.value}</span>`);
    return `<li>
              <span class="name">${cityName}, ${stateName}</span>
              <span class="population">${numberWithComma(value.population)}</span>
            </li>`
  }).join("");

  suggestions.innerHTML = list;
}

function numberWithComma(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}