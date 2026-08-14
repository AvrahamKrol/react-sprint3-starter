const { Fragment, useRef, useEffect } = React

export const NoteText = ({ isShown, info, onChangeVal, onClose }) => {
  const titleAreaRef = useRef()
  const textareaRef = useRef()

  useEffect(() => {
    if (isShown && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

    if (isShown && titleAreaRef.current) {
      titleAreaRef.current.style.height = 'auto'
      titleAreaRef.current.style.height = `${titleAreaRef.current.scrollHeight}px`
    }
  }, [isShown, info])

  function onSave() {
    onClose()
  }
  return (
    <Fragment>
      {isShown ? (
        <section className="info flex column">
          <form className="info-textarea">
            <textarea
              ref={titleAreaRef}
              name="note-title"
              id="title"
              placeholder="Title"
              value={info.title || ''}
              onChange={(ev) => onChangeVal('title', ev.target.value)}
            ></textarea>
            <textarea
              ref={textareaRef}
              name="note-txt"
              id="txt"
              placeholder="Note"
              value={info.txt || ''}
              onChange={(ev) => onChangeVal('txt', ev.target.value)}
            ></textarea>
          </form>
          {/* <div className="time">{utilService.formatDate(note.createdAt)}</div> */}
        </section>
      ) : (
        <Fragment>
          <h2>{info.title}</h2>
          <p>{info.txt}</p>
        </Fragment>
      )}
      <section className="note-actions">
        <button className="save" onClick={onSave}>
          Save
        </button>
      </section>
    </Fragment>
  )
}
