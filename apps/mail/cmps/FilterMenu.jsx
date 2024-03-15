const { useState, useEffect } = React

export function FilterMenu({ filterBy, onSetFilter, unreadCount }) {
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

    function log({ target }) {
        const { value } = target
        console.log('value:', value)
    }


    return <fieldset className="filter-menu">
        <div><span><span className="fa inbox-icon"></span>Inbox</span> <span>{unreadCount}</span></div>
        <div><span><span className="fa sent-icon"></span>Sent</span></div>
        <div><span><span className="fa draft-icon"></span>Draft</span></div>
        <div><span><span className="fa trash-icon"></span>Trash</span> <span>123</span></div>

        <div className="lables-menu"><span><span className="fa lable-icon"></span>Labels</span></div>
    </fieldset>
}