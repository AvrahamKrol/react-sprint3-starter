import { NoteForm } from './NoteForm.jsx'

const { Fragment } = React

export const NoteText = ({
  isEditAddForm,
  isShown,
  note,
  onChangeVal,
  onSave,
  onRemove,
}) => {
  function handleRemove(ev, id) {
    ev.stopPropagation()
    onRemove(id)
  }

  return (
    <Fragment>
      {isShown ? (
        <NoteForm
          isEditAddForm={isEditAddForm}
          isShown={isShown}
          note={note}
          onChangeVal={onChangeVal}
          onSave={onSave}
          onRemove={onRemove}
        />
      ) : (
        <Fragment>
          <h2>{note.info.title}</h2>
          <p>{note.info.txt}</p>
          <div className="actions-container">
            <div
              className="delete icon-container"
              onClick={(ev) => handleRemove(ev, note.id)}
            >
              <i className="fa-solid fa-trash icon"></i>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
