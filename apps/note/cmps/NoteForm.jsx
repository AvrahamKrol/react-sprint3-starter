const { useRef, useEffect } = React

export const NoteForm = ({
  isEditAddForm = true,
  isShown = false,
  info,
  onChangeVal,
  onOpenForm,
  onSave,
}) => {
  const titleAreaRef = useRef()
  const textareaRef = useRef()

  function resizeTextArea(textarea) {
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useEffect(() => {
    if (!isShown) return

    setTimeout(() => {
      resizeTextArea(titleAreaRef.current)
      resizeTextArea(textareaRef.current)
    }, 0)
  }, [isShown, info.title, info.txt])

  useEffect(() => {}, [])

  function isOpen() {
    if (isEditAddForm) return isEditAddForm
    if (isShown) return isShown
  }

  function handleSave(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    onSave()
  }

  return (
    <section
      className={`info flex column ${!isShown ? 'info-add' : ''}`}
      onClick={onOpenForm}
    >
      <form className="info-textarea" onSubmit={handleSave}>
        {isOpen() && (
          <textarea
            ref={titleAreaRef}
            name="note-title"
            id="title"
            className="info-title"
            placeholder="Title"
            value={info.title || ''}
            onChange={(ev) =>
              onChangeVal(isEditAddForm, 'title', ev.target.value)
            }
          ></textarea>
        )}

        <textarea
          ref={textareaRef}
          name="note-txt"
          id="txt"
          placeholder="Note"
          value={info.txt || ''}
          onChange={(ev) => onChangeVal(isEditAddForm, 'txt', ev.target.value)}
        ></textarea>
        <section className="note-actions">
          <button className="save" type="submit">
            Save
          </button>
        </section>
      </form>
      {/* <div className="time">{utilService.formatDate(note.createdAt)}</div> */}
    </section>
  )
}
