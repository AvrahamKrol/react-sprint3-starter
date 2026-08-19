const { useState, useEffect } = React

export function MailFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ filter }) {
        const { type, value, name: key } = filter
        setFilterByToEdit(prev => ({ ...prev, [key]: type === 'mail' }))
    }

    return <form className="mail-filter">
        <input
            type="text"
            name="txt"
            placeholder="vendor"
            onChange={handleChange}
            value={filterByToEdit.txt} />
    </form>
}