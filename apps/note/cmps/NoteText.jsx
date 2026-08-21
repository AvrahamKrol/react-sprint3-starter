const { Fragment, useState } = React

import { NoteActions } from './NoteActions.jsx'
import { NoteForm } from './NoteForm.jsx'

const bgcColors = {
  sand: '#fff8b8',
  coral: '#faafa8',
  mint: '#e2f6d3',
  gray: '#aeccdc',
  peach: '#f39f76',
  whitesmoke: 'whitesmoke',
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
          <NoteActions
            noteId={note.id}
            bgcColors={bgcColors}
            onRemove={onRemove}
            onChangeColor={onChangeColor}
          />
        </div>
      )}
    </Fragment>
  )
}
