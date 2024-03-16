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
        const { value, name: field } = target
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    return <section className="mail-filter flex align-center">
        <form onSubmit={onFilter}>
            <div className="search-bar flex align-center">
                <div className="fa search"></div>
                <input type="text"
                    name="txt"
                    id="title"
                    title="search an email"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="search-input"
                />
            </div>
        </form>
    </section>
}