const { useState, useEffect } = React

import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { Compose } from "../cmps/Compose.jsx"

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [unreadCount, setUnreadCount] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [mailDetails, setMailDetails] = useState(
        mailService.getEmptyMail()
    )


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

    function onSendMail(ev) {
        ev.preventDefault()
        console.log('mail:', mail)
    }

    return <section className="mails-container">
        <div className="unreadCount-counter">New: {unreadCount}</div>
        <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <button className="open-modal-btn"
            onClick={() => {
                setOpenModal(true)
            }}>
            Compose
        </button>
        {openModal && <Compose onSendMail={onSendMail} openModal={openModal} setOpenModal={setOpenModal} />}
        <MailList mails={mails} onRemoveMail={onRemoveMail} />
    </section>
}
