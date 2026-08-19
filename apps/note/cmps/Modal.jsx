const { useRef, useEffect } = React

export function Modal({ isShown, children, style, onCloseModal = null }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (isShown && dialogRef.current) dialogRef.current.showModal()
    else if (dialogRef.current) dialogRef.current.close()
  }, [isShown])

  function onClose() {
    if (onCloseModal) onCloseModal()
  }

  return (
    <dialog
      style={style}
      closedby="any"
      ref={dialogRef}
      onCancel={onClose}
      className="modal"
    >
      {children}

      <button className="btn-close" onClick={onCloseModal}></button>
    </dialog>
  )
}
