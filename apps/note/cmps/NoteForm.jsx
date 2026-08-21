const { Fragment, useRef, useEffect, useState } = React

export const NoteForm = ({
  isEditAddForm = true,
  isShown = false,
  note,
  bgcColors,
  onChangeVal,
  onChangeColor,
  onOpenForm,
  onSave,
  onRemove,
  onCloseEditAddForm,
}) => {
  const [isColorOpen, setIsColorOpen] = useState(false)

  const isAddForm = onRemove
  const { info } = note

  const titleAreaRef = useRef()
  const textareaRef = useRef()

  useEffect(() => {
    if (!isShown) return

    setTimeout(() => {
      resizeTextArea(titleAreaRef.current)
      resizeTextArea(textareaRef.current)
    }, 0)
  }, [isShown, info.title, info.txt])

  const formContainerRef = useRef(null)

  useEffect(() => {
    if (!isEditAddForm) return

    function handleClickOutside(ev) {
      if (
        formContainerRef.current &&
        !formContainerRef.current.contains(ev.target)
      )
        if (onCloseEditAddForm) onCloseEditAddForm()
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isEditAddForm, onCloseEditAddForm])

  function resizeTextArea(textarea) {
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  function isOpen() {
    if (isEditAddForm) return isEditAddForm
    if (isShown) return isShown
  }

  function handleSave(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    onSave()
  }

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
    <section
      ref={formContainerRef}
      className={`info flex column ${!isShown ? 'info-add' : ''}`}
      onClick={onOpenForm}
    >
      <form
        // ref={formContainerRef}
        className="info-textarea"
        onSubmit={handleSave}
      >
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
          {isAddForm && (
            <Fragment>
              <div className="actions-container">
                <div
                  className="icon-container"
                  onClick={(ev) => handleRemove(ev, note.id)}
                >
                  <i className="fa-solid fa-trash icon"></i>
                </div>
                <div
                  className="icon-container"
                  onClick={(ev) => handleIsOpenColor(ev)}
                >
                  <i className="fa-solid fa-paintbrush icon"></i>
                </div>
              </div>
              <div
                className={`color-container ${!isColorOpen ? 'hidden' : ''}`}
              >
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
            </Fragment>
          )}
          {isOpen() && (
            <button className="save" type="submit">
              Save
            </button>
          )}
        </section>
      </form>
      {/* <div className="time">{utilService.formatDate(note.createdAt)}</div> */}
    </section>
  )
}
