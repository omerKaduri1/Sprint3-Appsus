const { useState, useEffect } = React

export function FilterMenu({ filterBy, onSetFilter, unreadCount }) {
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
        <div className="div-container">
            <div className="div-content flex space-between"
                id="inbox"
                onClick={handleStatusChange}>
                <span><span className="fa inbox-icon"></span>Inbox</span> <span>{unreadCount}</span></div>
        </div>
        <div className="div-container">
            <div className="div-content"
                id="sent"
                onClick={handleStatusChange}>
                <span><span className="fa sent-icon"></span>Sent</span></div>
        </div>
        <div className="div-container">
            <div className="div-content"
                id="draft"
                onClick={handleStatusChange}>
                <span><span className="fa draft-icon"></span>Draft</span></div>
        </div>
        <div className="div-container">
            <div className="div-content flex space-between"
                id="trash" onClick={handleStatusChange}>
                <span><span className="fa trash-icon"></span>Trash</span><span>0</span></div>
        </div>

        <div className="lables-menu"><span><span className="fa lable-icon"></span>Labels</span></div>
    </fieldset>
}