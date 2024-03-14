const { useEffect } = React

export function FilterMenu({ filterBy, onSetFilter }) {

    // useEffect(() => {
    //     onSetFilter(filterByToEdit)
    // }, [filterByToEdit])

    // function onFilter(ev) {
    //     ev.preventDefault()
    //     onSetFilter(filterByToEdit)
    // }

    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    // }

    function log({ target }) {
        const { value } = target
        console.log('value:', value)
    }


    return <fieldset className="filter-menu">
        <div>
            <label htmlFor="inbox">Inbox</label>
            <input
                type="radio"
                id="inbox"
                name="status"
                value="inbox"
                onChange={log}
                defaultChecked
            />
        </div>

        <div>
            <label htmlFor="sent">Sent</label>
            <input
                type="radio"
                id="sent"
                name="status"
                value="sent"
                onChange={log}
            />
        </div>


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
    </fieldset>
}