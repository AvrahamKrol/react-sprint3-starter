const { Fragment, useState } = React

import { NoteForm } from './NoteForm.jsx'

const bgcColors = {
  sand: '#fff8b8',
  coral: '#faafa8',
  mint: '#e2f6d3',
  gray: '#aeccdc',
  peach: '#f39f76',
}

export const NoteText = ({
  isEditAddForm,
  isShown,
  note,
  onChangeVal,
  onChangeColor,
  onSave,
  onRemove,
  onClose,
}) => {
  const [isColorOpen, setIsColorOpen] = useState(false)

  function handleRemove(ev, id) {
    ev.stopPropagation()
    onRemove(id)
  }

  function handleIsOpenColor(ev) {
    ev.stopPropagation()
    setIsColorOpen(!isColorOpen)
  }

  function handleChangeBGC(ev, color) {
    ev.stopPropagation()
    onChangeColor(color)
    setIsColorOpen(false)
  }

  return (
    <Fragment>
      {isShown ? (
        <NoteForm
          isEditAddForm={isEditAddForm}
          isShown={isShown}
          note={note}
          bgcColors={bgcColors}
          onChangeVal={onChangeVal}
          onChangeColor={onChangeColor}
          onSave={onSave}
          onRemove={onRemove}
          onClose={onClose}
        />
      ) : (
        <div>
          <h2>{note.info.title}</h2>
          <p>{note.info.txt}</p>
          <div className="actions-container">
            <div
              className="icon-container"
              onClick={(ev) => handleRemove(ev, note.id)}
            >
              <i className="fa-solid fa-trash icon"></i>
            </div>
            <div className="icon-container" onClick={handleIsOpenColor}>
              <i className="fa-solid fa-paintbrush icon"></i>
            </div>
            <div className={`color-container ${!isColorOpen ? 'hidden' : ''}`}>
              <span
                className="color-item mint-color"
                onClick={(ev) => handleChangeBGC(ev, bgcColors.mint)}
              ></span>
              <span
                className="color-item sand-color"
                onClick={(ev) => handleChangeBGC(ev, bgcColors.sand)}
              ></span>
              <span
                className="color-item coral-color"
                onClick={(ev) => handleChangeBGC(ev, bgcColors.coral)}
              ></span>
              <span
                className="color-item peach-color"
                onClick={(ev) => handleChangeBGC(ev, bgcColors.peach)}
              ></span>
              <span
                className="color-item gray-color"
                onClick={(ev) => handleChangeBGC(ev, bgcColors.gray)}
              ></span>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}
