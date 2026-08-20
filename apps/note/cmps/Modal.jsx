const { useRef, useEffect } = React

export function Modal({ isShown, children, style, onCloseModal = null }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (isShown && dialogRef.current) {
      dialogRef.current.showModal()
      document.body.style.overflow = 'hidden'
    } else if (dialogRef.current) {
      dialogRef.current.close()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
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
