import { NoteText } from './NoteText.jsx'

export const NotePreview = ({
  isEditAddForm,
  isShown,
  note,
  onChangeNote,
  onSave,
  onRemove,
}) => {
  return (
    <DynamicCmp
      cmpType={note.type}
      note={note}
      onSave={onSave}
      onRemove={onRemove}
      isEditAddForm={isEditAddForm}
      isShown={isShown}
      onChangeVal={(isEditAddForm, type, val) =>
        onChangeNote(isEditAddForm, type, val)
      }
    />
  )
}

function DynamicCmp(props) {
  const cmpMap = {
    NoteTxt: <NoteText {...props} />,
  }
  return cmpMap[props.cmpType]
}
