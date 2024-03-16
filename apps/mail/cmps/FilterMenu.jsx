const { useState, useEffect } = React

export function FilterMenu({ filterBy, onSetFilter, unreadCount }) {
    const [selectedFilter, setSelectedFilter] = useState('inbox')
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleStatusChange({ currentTarget }) {
        const value = currentTarget.id
        const valueToUpdate = { mailStatus: value }
        setSelectedFilter(value)
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, ...valueToUpdate }))
    }

    return <fieldset className="filter-menu">
        <div className={`div-container ${(selectedFilter === 'inbox') ? 'selected-line' : ''}`}>
            <div className="div-content flex space-between align-center"
                id="inbox"
                onClick={handleStatusChange}>
                <span><span className="fa inbox-icon"></span>Inbox</span> <span>{unreadCount}</span></div>
        </div>
        <div className={`div-container ${(selectedFilter === 'sent') ? 'selected-line' : ''}`}>
            <div className="div-content flex space-between align-center"
                id="sent"
                onClick={handleStatusChange}>
                <span><span className="fa sent-icon"></span>Sent</span></div>
        </div>
        <div className={`div-container ${(selectedFilter === 'draft') ? 'selected-line' : ''}`}>
            <div className="div-content flex space-between align-center"
                id="draft"
                onClick={handleStatusChange}>
                <span><span className="fa draft-icon"></span>Draft</span></div>
        </div>
        <div className={`div-container ${(selectedFilter === 'trash') ? 'selected-line' : ''}`}>
            <div className="div-content flex space-between align-center"
                id="trash" onClick={handleStatusChange}>
                <span><span className="fa trash-icon"></span>Trash</span><span>0</span></div>
        </div>

        <div className={`lables-menu div-container ${(selectedFilter === 'lables') ? 'selected-line' : ''}`}>
            <div className="div-content flex space-between align-center"
                id="labels" onClick={handleStatusChange}>
                <span><span className="fa lable-icon"></span>Labels</span></div>
        </div>
    </fieldset >
}