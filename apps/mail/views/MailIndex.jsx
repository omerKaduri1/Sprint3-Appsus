const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

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
    const [mails, setMails] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))


    useEffect(() => {
        setSearchParams(filterBy)
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
        countUnread()
    }

    function countUnread() {
        mailService.query().then(prevMails => (
            prevMails.filter(mail => !mail.isRead)
        )).then(res => setUnreadCount(res.length))
    }

    function toggleRead(mailId, isRead) {
        const valueToUpdate = { isRead: (isRead) ? false : true }
        mailService.get(mailId)
            .then(res => ({ ...res, ...valueToUpdate }))
            .then(mailService.save)
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

    function onOpenMail(mailId) {
        console.log('mailId:', mailId)
        mailService.get(mailId)
            .then((res) => {
                console.log(res)
                res.isRead = true
                mailService.save(res)
            })
            
            .catch(err => console.log(err))
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setMail(prevMailDetails => ({
            ...prevMailDetails,
            [field]: value,
        }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()

        mail.mailStatus = 'sent'
        mailService.send(mail)
        setOpenModal(false)
    }

    const { mailStatus, txt, isStared, isRead, lables } = filterBy
    return <React.Fragment>
        <section className="search-container flex">
            {openModal && <Compose mail={mail} setMail={setMail} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} />}
            <button className="open-modal-btn"
                onClick={() => {
                    setOpenModal(true)
                }}>
                <span className="fa pen-icon"></span>
                Compose
            </button>
            <MailFilter filterBy={{ txt, isRead }} onSetFilter={onSetFilter} />
        </section>
        <section className="flex">
            <FilterMenu filterBy={{ mailStatus, isStared, lables }} onSetFilter={onSetFilter} unreadCount={unreadCount} />
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
                countUnread={countUnread}
                onOpenMail={onOpenMail}
                toggleRead={toggleRead} />
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