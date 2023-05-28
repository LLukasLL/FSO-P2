import { useState, useEffect } from 'react'

import getWeather from '../services/weatherAPI'

const Languages = ({languages}) => {
  return languages.map( language => 
    <li key={language}>{language}</li>
  )
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null);
  const weatherHook = () => {
    getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then(response => setWeather(response))
  }
  useEffect(weatherHook, [])
  if (weather !== null) {
    const iconAdress = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    // <img src={iconAdress}
    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        <p>{weather.weather[0].description}</p>
        <img src={iconAdress} alt="weather icon"/>
      </div>
    )
  }
  return (
    <div></div>
  )
}

const Country = ({country}) => {
  let languagesArr = [];
  for (const key in country.languages) {
    languagesArr = languagesArr.concat(country.languages[key]);
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <div>population: {country.population}</div>
      <h3>languages: </h3>
      <ul>
        <Languages languages={languagesArr}/>
      </ul>
      <img src={country.flags.svg} alt="flag of this country"/>
      <Weather country={country} />
    </div>
  )
}

const Countries = ({countries, filter, setCountries}) => {

  if (filter !== '') {
    filter = filter.toUpperCase()
    countries = countries.filter(country => country.name.common.toUpperCase().search(filter.toUpperCase()) > -1)
  }

  if (countries.length > 10) return <div>Too many countries, specify a better Filter</div>

  if (countries.length > 1) {
    return countries.map( country => (
      <div key={country.name.common}>
        {country.name.common} 
        <button onClick={() => setCountries([country])}>show</button>
      </div>
    ))
  }
  if (countries.length === 1) {
    return <Country country={countries[0]}/>
  }
  return <div></div>;
} 


export default Countries;
