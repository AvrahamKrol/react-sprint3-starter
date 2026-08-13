import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { Modal } from './Modal.jsx'

const { Fragment, useState, useEffect, useRef } = React

export function NoteList() {
  const [notes, setNotes] = useState([])
  const [isShown, setIsShown] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())

  const titleAreaRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    loadNotes()
  }, [])

  useEffect(() => {
    if (isShown && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

    if (isShown && titleAreaRef.current) {
      titleAreaRef.current.style.height = 'auto'
      titleAreaRef.current.style.height = `${titleAreaRef.current.scrollHeight}px`
    }
  }, [isShown, noteToEdit])

  if (!notes.length) return

  function loadNotes() {
    noteService.query().then((data) => {
      setNotes(data)
    })
  }

  function onClose() {
    console.log('wow')
    setIsShown(false)
  }

  function onEdit(note) {
    if (!note) return
    if (!note.title) note.info.title = ''
    console.log(note)

    setNoteToEdit(note)
  }

  function onSave() {
    onClose()
  }

  function handleTitleChange(ev) {
    console.log(ev.target.value)
    setNoteToEdit((prevNote) => ({
      ...prevNote,
      info: { title: ev.target.value },
    }))
  }

  function handleTxtChange(ev) {
    setNoteToEdit((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, txt: ev.target.value },
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
          <p>{note.info.txt}</p>
        </li>
      ))}
      <Modal isShown={isShown} style={noteToEdit.style} onClose={onClose}>
        {noteToEdit && (
          <Fragment>
            <section className="info flex column">
              <div className="info-textarea">
                <textarea
                  ref={titleAreaRef}
                  name="note-title"
                  id="title"
                  placeholder="Title"
                  value={noteToEdit.info.title}
                  onChange={handleTitleChange}
                ></textarea>
                <textarea
                  ref={textareaRef}
                  name="note-txt"
                  id="txt"
                  placeholder="Note"
                  value={noteToEdit.info.txt}
                  onChange={handleTxtChange}
                ></textarea>
              </div>
              <div className="time">
                {utilService.formatDate(noteToEdit.createdAt)}
              </div>
            </section>
            <section className="note-actions">
              <button className="save" onClick={onSave}>
                Save
              </button>
            </section>
          </Fragment>
        )}
      </Modal>
    </ul>
  )
}
