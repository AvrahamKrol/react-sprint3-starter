export function NoteFilter({ filterBy, onSetFilterBy, onToggleSidebar }) {
  function handleChange(ev) {
    onSetFilterBy({ ...filterBy, txt: ev.target.value, onToggleSidebar })
  }

  return (
    <section className="note-header flex">
      <div className="sidebar-brand flex">
        <button className="brand-btn" onClick={onToggleSidebar}>
          <i className="fa-solid fa-bars brand-icon"></i>
        </button>
        <div className="brand-container flex">
          <img
            src="/react-sprint3-starter/assets/imgs/logo_keep.png"
            alt="logo"
          />
          <span>Keep</span>
        </div>
      </div>
      <div className="search-container flex">
        <i className="fa-solid fa-magnifying-glass"></i>
        <form>
          <input
            type="text"
            placeholder="Search notes..."
            value={filterBy.txt}
            onChange={handleChange}
            className="note-filter"
          />
        </form>
      </div>
    </section>
  )
}
