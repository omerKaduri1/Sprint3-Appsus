const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function FilterMenu({ filterBy, onSetFilter, unreadCount }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleStatusChange({ currentTarget }) {
        console.log('ev:', currentTarget)
        // setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [mailStatus]: statusValue }))
    }
    return <fieldset className="filter-menu">
        <div data="inbox" onClick={handleStatusChange}><span><span className="fa inbox-icon"></span>Inbox</span> <span>{unreadCount}</span></div>
        <div ><span><span className="fa sent-icon"></span>Sent</span></div>
        <div><span><span className="fa draft-icon"></span>Draft</span></div>
        <div><span><span className="fa trash-icon"></span>Trash</span> <span>123</span></div>

        <div className="lables-menu"><span><span className="fa lable-icon"></span>Labels</span></div>
    </fieldset>
}