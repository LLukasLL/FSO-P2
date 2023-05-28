const Course = ({course}) => {
    return (
      <div>
        <h1>{course.name}</h1>
        <ul>
          {course.parts.map((part => <li style={{"listStyleType": "none"}} key={part.id}>{part.name} {part.exercises}</li>))}
          <li style={{"fontWeight": "bold", "listStyleType": "none"}}>Sum of the exercises {course.parts.reduce((acc, currV) => acc + currV.exercises, 0)}</li>
        </ul>
      </div>
    )
  }

export default Course