import { NoteText } from './NoteText.jsx'

export const NotePreview = ({ isShown, note, onChangeNote, onClose }) => {
  console.log('note:', note)
  return (
    <DynamicCmp
      // key={note.id}
      cmpType={note.type}
      info={note.info}
      onClose={onClose}
      isShown={isShown}
      // val={answersMap[note.id] || ''}
      onChangeVal={(type, val) => onChangeNote(type, val)}
    />
  )
}

function DynamicCmp(props) {
  const cmpMap = {
    NoteTxt: <NoteText {...props} />,
  }
  return cmpMap[props.cmpType]
}
