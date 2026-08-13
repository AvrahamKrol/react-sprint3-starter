const { useRef, useEffect } = React

export function Modal({ isShown, children, style, onClose = null }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (isShown && dialogRef.current) dialogRef.current.showModal()
    else if (dialogRef.current) dialogRef.current.close()
  }, [isShown])

  function onCloseModal() {
    if (onClose) onClose()
  }

  return (
    <dialog
      style={style}
      closedby="any"
      ref={dialogRef}
      onCancel={onCloseModal}
      className="modal"
    >
      {children}

      <button className="btn-close" onClick={onCloseModal}></button>
    </dialog>
  )
}
