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
        <div className={`div-container ${(selectedFilter === 'inbox') ? 'selected-line' : ''}`}
            title="Inbox">
            <div className="div-content flex space-between align-center"
                id="inbox"
                title="inbox section"
                onClick={handleStatusChange}>
                <span><span className="fa inbox-icon"></span><span className="filter-menu-text">Inbox</span></span> <span>{unreadCount}</span></div>
        </div>
        <div className={`div-container ${(selectedFilter === 'sent') ? 'selected-line' : ''}`}
            title="Sent">
            <div className="div-content flex space-between align-center"
                id="sent"
                title="sent section"
                onClick={handleStatusChange}>
                <span><span className="fa sent-icon"></span><span className="filter-menu-text">Sent</span></span></div>
        </div>
        <div className={`div-container ${(selectedFilter === 'draft') ? 'selected-line' : ''}`}
            title="Draft">
            <div className="div-content flex space-between align-center"
                id="draft"
                title="draft section"
                onClick={handleStatusChange}>
                <span><span className="fa draft-icon"></span><span className="filter-menu-text">Draft</span></span></div>
        </div>
        <div className={`div-container ${(selectedFilter === 'trash') ? 'selected-line' : ''}`}
            title="Trash">
            <div className="div-content flex space-between align-center"
                id="trash" onClick={handleStatusChange}>
                <span><span className="fa trash-icon"></span><span className="filter-menu-text">Trash</span></span><span>0</span></div>
        </div>

        <div className={`lables-menu div-container ${(selectedFilter === 'lables') ? 'selected-line' : ''}`}
            title="Labels">
            <div className="div-content flex space-between align-center"
                id="labels" onClick={handleStatusChange} title="labels">
                <span><span className="fa lable-icon"></span><span className="filter-menu-text">Labels</span></span></div>
        </div>
    </fieldset >
}