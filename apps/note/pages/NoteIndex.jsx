const { NavLink, Outlet } = ReactRouterDOM

export function NoteIndex() {
  return (
    <section className="note-container">
      <section className="sidebar flex column">
        <NavLink
          to="/note/home"
          className={({ isActive }) =>
            `icon-container ${isActive ? 'active' : ''}`
          }
        >
          <i className="fa-regular fa-lightbulb icon"></i>
          <label>Notes</label>
        </NavLink>
        <NavLink
          to="/note/trash"
          className={({ isActive }) =>
            `icon-container ${isActive ? 'active' : ''}`
          }
        >
          <i className="fa-solid fa-trash-can icon"></i>
          <label>Trash</label>
        </NavLink>
      </section>
      <section className="main-container">
        <Outlet />
      </section>
    </section>
  )
}
