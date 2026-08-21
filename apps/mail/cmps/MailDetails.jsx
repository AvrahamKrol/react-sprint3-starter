const { useEffect, useRef } = React

export function MailDetails({ selectedMail, onCloseDetails }) {
    const dialogRef = useRef()

    useEffect(() => {
        if (selectedMail) dialogRef.current.showModal()
        else dialogRef.current.close()
    }, [selectedMail])

    return <dialog onClose={onCloseDetails} ref={dialogRef} closedby="any" className="mail-details">
        <h2>{selectedMail && selectedMail.vendor}</h2>
        <p>{selectedMail && selectedMail.id}</p>
        <p>{selectedMail && selectedMail.maxSpeed}</p>

        <button onClick={onCloseDetails}>x</button>
    </dialog>
}