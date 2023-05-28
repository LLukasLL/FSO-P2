const Numbers = ({persons, filter, delPerson}) => {

    if (filter !== '') {
      persons = persons.filter(person => person.name.search(filter) > -1);
    }
    return persons.map(person => (
        <div key={person.id} style={{display: 'flex'}}>
            <p>{person.name} {person.number}</p><button onClick={() => delPerson(person.id, person.name)}>Delete</button>
        </div>
    ))
  }

  export default Numbers;