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
        const { value } = target.dataset
        if (!value) {
            setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, ...{ isStared: null, isRead: null } }))
        } else {
            let { name: field } = target
            setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
        }
    }

    return <section className="mail-filter flex align-center">
        <form onSubmit={onFilter}>
            <input type="text"
                name="txt"
                id="title"
                title="search an email"
                data-value={filterByToEdit.txt}
                value={filterByToEdit.txt}
                onClick={handleChange}
                placeholder="Search..."
                className="search-input" />
        </form>
    </section>
}