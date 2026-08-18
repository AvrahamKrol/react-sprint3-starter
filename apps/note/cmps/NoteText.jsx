import { NoteForm } from './NoteForm.jsx'

const { Fragment } = React

export const NoteText = ({
  isEditAddForm,
  isShown,
  info,
  onChangeVal,
  onSave,
}) => {
  return (
    <Fragment>
      {isShown ? (
        <NoteForm
          isEditAddForm={isEditAddForm}
          isShown={isShown}
          info={info}
          onChangeVal={onChangeVal}
          onSave={onSave}
        />
      ) : (
        <Fragment>
          <h2>{info.title}</h2>
          <p>{info.txt}</p>
        </Fragment>
      )}
    </Fragment>
  )
}
