const { useState } = React

const sidebarItems = [
  { id: 'notes', label: 'Notes', icon: 'fa-regular fa-lightbulb' },
  { id: 'trash', label: 'Trash', icon: 'fa-solid fa-trash-can' },
]

export function NoteIndex() {
  const [selectedSection, setSelectedSection] = useState('notes')

  return (
    <section className="">
      <section className="sidebar open flex column">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            className={`icon-container ${selectedSection === item.id ? 'active' : ''}`}
            onClick={() => setSelectedSection(item.id)}
          >
            <i className={`${item.icon} icon`}></i>
            <label>{item.label}</label>
          </div>
        ))}
      </section>
      <section className="main-container"></section>
    </section>
  )
}
