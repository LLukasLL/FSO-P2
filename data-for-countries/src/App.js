import { useState, useEffect } from 'react'
import Form from './components/Form'
import serverLink from './services/serverLink'
import Countries from './components/Countries'
import getWeather from './services/weatherAPI'


const App = () => {
  const [searchString, setSearchString] = useState('');
  const [countries, setCountries] = useState([]);

  const onChangy = e => {
    setSearchString(e.target.value);
  }

  const Hook = () => {
    serverLink
      .getty()
      .then(response => setCountries(response))
  }
  useEffect(Hook, [searchString])


  return (
    <div>
      <h1>Data for Countries</h1>
      <Form onChangy={onChangy}/>
      <Countries countries={countries} filter={searchString} setCountries={setCountries}/>
    </div>
  )
}

export default App;
