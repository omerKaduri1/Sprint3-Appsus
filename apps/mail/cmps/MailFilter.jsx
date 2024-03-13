const { useEffect, useState } = React

export function MailFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    return <section className="mail-filter">
        <form onSubmit={onFilter}>
            <input type="text"
                name="txt"
                id="title"
                value={filterByToEdit.txt}
                onChange={handleChange}
                placeholder="Search..." />

            <label htmlFor="is-read">Read</label>
            <input
                type="checkbox"
                name="is-read"
                id="is-read"
                value={filterByToEdit.isRead}
                onChange={handleChange} />
        </form>
    </section>
}