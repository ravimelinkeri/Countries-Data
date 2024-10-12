
const countryContainer =document.querySelector('.country-container')
const modeChange = document.querySelector('.mode-change')
const darkChange = document.querySelector('.dark')
const icon = document.querySelector('#icon')

const light = document.querySelector('#light')
const dark = document.querySelector('#dark')

const filterbyregion = document.querySelector('#filter-by-region')
const Seaechcontainer = document.querySelector('.searchbar input')

let allCountriesData


fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data) =>{
    renderCountries(data)
    allCountriesData = data
})

filterbyregion.addEventListener('change', (e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterbyregion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data){
    countryContainer.innerHTML = ''
    data.forEach((country) =>{

        // console.log(country.borders)
       
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href=`country-details.html?name=${country.name.common}`
        
        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag Img" class="country-flag">
                    <h3 class="country-name">${country.name.common}</h3>
                    <div class="country-details">
                        <p><span>Population :</span> ${country.population.toLocaleString('en-US')}</p>
                        <p><span>Region :</span> ${country.region}</p>
                        <p><span>Capital :</span> ${country.capital}</p>
                    </div>
        
        `
        
        countryContainer.append(countryCard) 

    })
}

Seaechcontainer.addEventListener('input', (e)=>{
    // console.log(e.target.value);
    // console.log(allCountriesData);
    const filteredCountry = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountry)
})

modeChange.addEventListener('click', ()=>{
    darkChange.classList.toggle("dark");
    light.style.display = "block"
    if(light.style.display === "block"){
        dark.style.display = "none"
    } 
})








