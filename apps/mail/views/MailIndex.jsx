const { useState, useEffect } = React

import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { FilterMenu } from '../cmps/FilterMenu.jsx'
import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { Compose } from '../cmps/Compose.jsx'

export function MailIndex() {
    const [mail, setMail] = useState({})
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [unreadCount, setUnreadCount] = useState(0)
    const [openModal, setOpenModal] = useState(false)


    useEffect(() => {
        loadMails()
        countUnread()
    }, [mails])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
    }

    function countUnread() {
        mailService.query().then(prevMails => (
            prevMails.filter(mail => mail.isRead === false)
        )).then(res => setUnreadCount(res.length))
    }

    function onRemoveMail(mailId) {
        mailService
            .remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail removed successfully (${mailId})`)
            })
            .catch(err => {
                console.log('Has issues with removing book', err)
                showErrorMsg(`Could not remove mail (${mailId})`)
            })
    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...fieldsToUpdate }))
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setMail(prevMailDetails => ({
            ...prevMailDetails,
            [field]: value,
        }))
    }

    function handleSubmit(ev) {
        mail.status = 'sent'
        ev.preventDefault()
        mailService.send(mail)
        setOpenModal(false)
    }

    return <React.Fragment>
        <section className="search-container flex">
            {openModal && <Compose mail={mail} setMail={setMail} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} />}
            <button className="open-modal-btn"
                onClick={() => {
                    setOpenModal(true)
                }}>
                Compose
            </button>
            <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        </section>
        <section className="flex">
            <FilterMenu filterBy={filterBy} onSetFilter={onSetFilter} />
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
        </section>

        <UserMsg />
    </React.Fragment >
}





{/* <ul className="filter-menu clean-list">
    <li onClick>
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
    </li>
</ul> */}