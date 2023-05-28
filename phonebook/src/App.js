import { useState, useEffect } from 'react'
import personsService from './services/serverComm'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Notification from './components/Notification'

const App = () => {
  // init:
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);
  const [messStyle, setMessStyle] = useState('message');

  const Hook = () => {
    personsService
      .getAll()
      .then(response => setPersons(response));
  }
  useEffect(Hook, []);

  // callbacks:
  const addPerson = (e) => {
    e.preventDefault();
    const personExists = persons.find(person => person.name === newName);
    if (personExists !== undefined) {
      if (window.confirm(`${newName} is already in phonebook, replace the old number?`)) {
        const updatedPersonObj = {
          name: newName,
          number: newNumber,
          id: personExists.id,
        }
        personsService
          .update(personExists.id, updatedPersonObj)
          .then(response => setPersons(persons.toSpliced(personExists.id - 1, 1, response)))
          .catch(error => toggleMessage(`${updatedPersonObj.name} doesn't exist on server`))
        toggleMessage(`${updatedPersonObj.name}s Number has been updated`);
      }
      return;
    }
    const newPersonObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setNewName('');
    setNewNumber('');
    personsService
      .create(newPersonObj)
      .then(response => {
        setPersons(persons.concat(response))
      })
      toggleMessage(`${newPersonObj.name} has been added`);
  }
  
  const filtery = (e) => {
    setFilter(e.target.value);
    // toggleMessage(`filter added`)
  }

  const delPerson = (id, name) => {
    const response = personsService.delInDB(id);
    if (response === 'deleted') {
      toggleMessage(`${name} has been deleted`);
      setPersons(persons.filter(person => person.id !== id));
    }
  }

  const toggleMessage = myMessage => {
    setMessage(myMessage);
    setTimeout(() => setMessage(null), 2000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messStyle={messStyle}/>
      <Filter filtery={filtery}/>
      <h2>add new</h2>
      <Form setNewName={setNewName} setNewNumber={setNewNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} delPerson={delPerson}/>
      <div>debug: {newName} {newNumber}</div>
    </div>
  )
}

export default App