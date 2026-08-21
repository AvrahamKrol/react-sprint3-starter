const { useState, useEffect } = React
const { NavLink, Outlet } = ReactRouterDOM
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { noteService } from '../services/note.service.js'

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    noteService.query(filterBy).then(setNotes)
  }

  function onRemove(noteId) {
    noteService.remove(noteId).then(() => {
      setNotes((prev) => prev.filter((note) => note.id !== noteId))
    })
  }

  function onToggleSidebar() {
    console.log('wpw')
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <main className="main-note flex column">
      <NoteFilter
        filterBy={filterBy}
        onSetFilterBy={setFilterBy}
        onToggleSidebar={onToggleSidebar}
      />
      <section className="main-note-container flex">
        <section
          className={`sidebar flex column ${isSidebarOpen ? 'active' : ''}`}
        >
          <NavLink
            to="/note/notes"
            className={({ isActive }) =>
              `sidebar-icon-container ${isActive ? 'active' : ''}`
            }
          >
            <i className="fa-regular fa-lightbulb icon"></i>
            <label>Notes</label>
          </NavLink>
          <NavLink
            to="/note/trash"
            className={({ isActive }) =>
              `sidebar-icon-container ${isActive ? 'active' : ''}`
            }
          >
            <i className="fa-solid fa-trash-can icon"></i>
            <label>Trash</label>
          </NavLink>
        </section>
        <section className="main-container">
          <Outlet context={{ notes, setNotes, loadNotes, onRemove }} />
        </section>
      </section>
    </main>
  )
}
