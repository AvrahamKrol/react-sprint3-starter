const { Fragment, useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'
import { NoteForm } from './NoteForm.jsx'
import { Modal } from './Modal.jsx'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'

export function NoteList() {
  const [notes, setNotes] = useState([])
  const [noteToUpdate, setNoteToUpdate] = useState(noteService.getEmptyNote())
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
  const [isShown, setIsShown] = useState(false)
  const [isEditAddForm, setIsEditAddForm] = useState(false)

  useEffect(() => {
    loadNotes()
  }, [])
  useEffect(() => {
    if (!isEditAddForm) return

    function handleKeyDown(ev) {
      if (ev.key === 'Escape') setIsEditAddForm(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isEditAddForm])

  function loadNotes() {
    noteService.query().then((notes) => {
      setNotes(notes)
    })
  }

  function onSaveAdd() {
    if (!noteToAdd.info.title && !noteToAdd.info.txt) {
      setIsEditAddForm(false)
      return
    }

    noteService
      .save(noteToAdd)
      .then((addedNote) => {
        setNoteToAdd(noteService.getEmptyNote())
        setIsEditAddForm(false)
        loadNotes()
        showSuccessMsg(`The note ${addedNote.id} was successfully added!`)
      })
      .catch((err) => showErrorMsg('Sorry, the note was note added'))
  }

  function onSaveEdit() {
    const originalNote = notes.find((note) => note.id === noteToUpdate.id)

    if (JSON.stringify(originalNote) === JSON.stringify(noteToUpdate)) {
      setIsShown(false)
      setNoteToUpdate(noteService.getEmptyNote())
      return
    }

    const updatedNote = { ...noteToUpdate, updatedAt: Date.now() }

    noteService
      .save(updatedNote)
      .then((updatedNote) => {
        console.log(updatedNote)
        setIsShown(false)
        setNoteToUpdate(noteService.getEmptyNote())
        loadNotes()
        showSuccessMsg(`The note ${updatedNote.id} was successfully updated!`)
      })
      .catch((err) => showErrorMsg('Sorry, the note was note updated'))
  }

  function onOpenForm() {
    setIsEditAddForm(true)
  }

  function onCloseModal() {
    setIsShown(false)
  }

  function onChangeNote(isEditAddForm, type, val) {
    if (!isEditAddForm) {
      setNoteToUpdate((prevNote) => ({
        ...prevNote,
        info: { ...prevNote.info, [type]: val },
      }))
      return
    }

    setNoteToAdd((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [type]: val },
    }))
  }

  function onChangePin(note) {
    const updatedNote = {
      ...note,
      isPinned: !note.isPinned,
    }

    setNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote.id === note.id ? updatedNote : prevNote,
      ),
    )

    noteService.save(updatedNote).catch((err) => {
      showErrorMsg('Could not update pin status')
      loadNotes()
    })
  }

  const pinnedNotes = notes.filter((note) => note.isPinned)
  const otherNotes = notes.filter((note) => !note.isPinned)

  function renderNote(note) {
    return (
      <li
        key={note.id}
        onClick={() => {
          setNoteToUpdate(note)
          setIsShown(true)
        }}
      >
        <div
          className="pin-icon-container"
          onClick={(ev) => {
            ev.stopPropagation()
            onChangePin(note)
          }}
        >
          <i
            className={`fa-solid fa-thumbtack pin-icon ${note.isPinned ? 'pinned' : ''}`}
          ></i>
        </div>
        <NotePreview isShown={false} note={note} />
      </li>
    )
  }

  return (
    <Fragment>
      <NoteForm
        isEditAddForm={isEditAddForm}
        info={noteToAdd.info}
        onChangeVal={onChangeNote}
        onOpenForm={onOpenForm}
        onSave={onSaveAdd}
      />

      {pinnedNotes.length > 0 && (
        <div className="notes-container">
          <h2>Pinned</h2>
          <ul className="notes pinned-notes">{pinnedNotes.map(renderNote)}</ul>
        </div>
      )}

      {otherNotes.length > 0 && (
        <div className="notes-container">
          {pinnedNotes.length > 0 && <h2>Other notes</h2>}
          <ul className="notes other-notes">{otherNotes.map(renderNote)}</ul>
        </div>
      )}

      <Modal
        isShown={isShown}
        style={noteToUpdate.style}
        onCloseModal={onCloseModal}
      >
        <NotePreview
          isEditAddForm={false}
          isShown={isShown}
          note={noteToUpdate}
          onChangeNote={onChangeNote}
          onSave={onSaveEdit}
        />
      </Modal>
    </Fragment>
  )
}
