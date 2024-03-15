const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function FilterMenu({ filterBy, onSetFilter, unreadCount }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleStatusChange({ currentTarget }) {
        const value = currentTarget.id
        const valueToUpdate = { mailStatus: value }
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, ...valueToUpdate }))
    }
    return <fieldset className="filter-menu">
        <div id="inbox" onClick={handleStatusChange}><span><span className="fa inbox-icon"></span>Inbox</span> <span>{unreadCount}</span></div>
        <div id="sent" onClick={handleStatusChange}><span><span className="fa sent-icon"></span>Sent</span></div>
        <div id="draft" onClick={handleStatusChange}><span><span className="fa draft-icon"></span>Draft</span></div>
        <div id="trash" onClick={handleStatusChange}><span><span className="fa trash-icon"></span>Trash</span> <span>123</span></div>

        <div className="lables-menu"><span><span className="fa lable-icon"></span>Labels</span></div>
    </fieldset>
}