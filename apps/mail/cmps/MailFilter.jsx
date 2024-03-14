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
        let { value, name: field } = target
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    return <section className="mail-filter flex align-center">
        <form onSubmit={onFilter}>
            <input type="text"
                name="txt"
                id="title"
                value={filterByToEdit.txt}
                onChange={handleChange}
                placeholder="Search..."
                className="search-input" />
        </form>
    </section>
}