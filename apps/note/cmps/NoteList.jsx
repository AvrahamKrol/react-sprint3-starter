import { noteService } from '../../../services/note.service.js'

const { useState, useEffect } = React

export function NoteList() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    loadNotes()
  }, [])

  if (!notes.length) return

  function loadNotes() {
    noteService.query().then((data) => {
      setNotes(data)
    })
  }

  return (
    <ul className="notes">
      {notes.map((note) => (
        <li key={note.id}>
          <p>{note.info.txt}</p>
        </li>
      ))}
    </ul>
  )
}
