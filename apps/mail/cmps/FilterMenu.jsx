const { useEffect } = React

export function FilterMenu({ filterBy, onSetFilter }) {

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


    return <ul className="filter-menu clean-list">
        <label htmlFor="Inbox"></label>
        <input
        type="radio"
        name="inbox"
        // value={}
        // onChange={}
          />

        <label htmlFor="sent"></label>
        <input
        type="radio"
        name="sent"
        // value={}
        // onChange={} 
         />


        {/* <li onClick={setFilterByToEdit(())}>
            Inbox <span>{unreadCount}</span>
        </li>
        <li>
            Starred <span>{0}</span>
        </li>
        <li>
            Sent <span>{0}</span>
        </li>
        <li>
            Draft <span>{0}</span>
        </li>
        <li>
            Trash <span>{0}</span>
        </li> */}
    </ul>
}