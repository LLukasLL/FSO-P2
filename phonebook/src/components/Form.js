const Form = ({setNewName, setNewNumber, addPerson}) => {
    return (
      <form>
        <div>
          Name: <input onChange={e => setNewName(e.target.value)}/>
        </div>
        <div>
          Number: <input onChange={e => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={e => addPerson(e)}>add</button>
        </div>
      </form>
    )
  }

  export default Form;