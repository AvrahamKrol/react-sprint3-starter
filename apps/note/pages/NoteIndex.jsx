const { NavLink, Outlet } = ReactRouterDOM

export function NoteIndex() {
  return (
    <main className="main-note">
      <section className="sidebar flex column">
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
        <Outlet />
      </section>
    </main>
  )
}
