const { Fragment, useState } = React

import { ColorPicker } from './ColorPicker.jsx'

export function NoteActions({ noteId, bgcColors, onRemove, onChangeColor }) {
  const [isColorOpen, setIsColorOpen] = useState(false)

  function handleRemove(ev) {
    ev.stopPropagation()
    onRemove(noteId)
  }

  function handleToggleColor(ev) {
    ev.stopPropagation()
    setIsColorOpen((prev) => !prev)
  }

  function handleChangeColor(color) {
    onChangeColor(color)
    setIsColorOpen(false)
  }

  return (
    <Fragment>
      <div className="actions-container">
        <div className="icon-container" onClick={handleRemove}>
          <i className="fa-solid fa-trash icon"></i>
        </div>
        <div className="icon-container" onClick={handleToggleColor}>
          <i className="fa-solid fa-paintbrush icon"></i>
        </div>
      </div>

      <ColorPicker
        isOpen={isColorOpen}
        bgcColors={bgcColors}
        onChangeColor={handleChangeColor}
      />
    </Fragment>
  )
}
