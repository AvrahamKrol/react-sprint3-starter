const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'
import { Modal } from './Modal.jsx'

export function NoteList() {
  const [notes, setNotes] = useState([])
  const [isShown, setIsShown] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService.query().then((data) => {
      setNotes(data)
    })
  }

  if (!notes.length) return

  function onClose() {
    setIsShown(false)
  }

  function onEdit(note) {
    if (!note) return
    const newNote = { ...note, info: { ...note.info } }
    if (!newNote.info.title) newNote.info.title = ''

    setNoteToEdit({ ...newNote, info: { ...newNote.info } })
  }

  function onChangeNote(type, val) {
    setNoteToEdit((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [type]: val },
    }))
  }

  return (
    <ul className="notes">
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => {
            setIsShown(true)
            onEdit(note)
          }}
        >
          <NotePreview
            isShown={false}
            note={note}
            onChangeNote={onChangeNote}
          />
        </li>
      ))}
      <Modal isShown={isShown} style={noteToEdit.style} onClose={onClose}>
        {noteToEdit && (
          <NotePreview
            isShown={isShown}
            note={noteToEdit}
            onChangeNote={onChangeNote}
            onClose={onClose}
          />
        )}
      </Modal>
    </ul>
  )
}
