
const imgFlag = document.querySelector('.flag')
const titleHeading = document.querySelector('.title-heading')
const nativeName = document.querySelector('.Native')
const Population = document.querySelector('.Population')
const Region = document.querySelector('.Region')
const subRegion = document.querySelector('.Sub-Region')
const Capital = document.querySelector('.Capital')
const Domain = document.querySelector('.Domain')
const Currencies = document.querySelector('.Currencies')
const Languages = document.querySelector('.Languages')
const borderr = document.querySelector('.borderr')
const btn = document.querySelector('.btn')
const light = document.querySelector('#light')
const dark = document.querySelector('#dark')

// Mode changer

const modeChange = document.querySelector('.mode-change')
const darkChange = document.querySelector('.dark')

const countryName = new URLSearchParams(location.search).get('name')
// console.log(countryName);

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res) => res.json())
.then(([country]) =>{

    // console.log(country);

    // console.log((Object.values(country.currencies)));

    // console.log(country.tld.join(', '));

    imgFlag.src = country.flags.svg

    titleHeading.innerText = country.name.common

    Population.innerText = country.population.toLocaleString('en-US')

    Region.innerText = country.region

    if(country.subregion){
        subRegion.innerText = country.subregion
    }

    if(country.capital){
        Capital.innerText = country.capital
    }


    if(country.name.nativeName){
        nativeName.innerText = (Object.values(country.name.nativeName)[0].common);
    } else{
        nativeName.innerText = country.name.common
    }

    if(country.tld){
        Domain.innerText = (country.tld.join(', '));
    }

    if(country.currencies){
        Currencies.innerText = ((Object.values(country.currencies).map((currency) => currency.name).join(',')));
   }

    if(country.languages){
        Languages.innerText = ((Object.values(country.languages).join(', ')));
   }

    if(country.borders) {
        country.borders.forEach((border)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=> res.json())
            .then(([borderCountry]) => {
            const borderCountryTag = document.createElement('a')
            borderCountryTag.classList.add('border-details')
            borderCountryTag.href = `country-details.html?name=${borderCountry.name.common}`
            borderCountryTag.innerText = borderCountry.name.common
            // console.log(borderCountryTag);

            borderr.append(borderCountryTag)
            
                
        })
        })
    }

})



modeChange.addEventListener('click', ()=>{
    darkChange.classList.toggle("dark");

})

