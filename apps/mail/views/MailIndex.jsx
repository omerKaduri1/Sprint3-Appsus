const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
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
    const [trashCount, setTrashCount] = useState(0)
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

    function onRemoveMail(currMail) {
        if (currMail.mailStatus === 'inbox') {
            currMail.mailStatus = 'trash'
            mailService.save(currMail)
                .then(() => {
                    setMails(prevMails => prevMails.filter(mail => mail.id !== currMail.id))
                    showSuccessMsg(`Moved to trash`)
                })
        }

        else if (currMail.mailStatus === 'trash') {
            mailService
                .remove(currMail.id)
                .then(() => {
                    setMails(prevMails => prevMails.filter(mail => mail.id !== currMail.id))
                    showSuccessMsg(`Mail removed successfully (${currMail.id})`)
                })
                .catch(err => {
                    console.log('Has issues with removing book', err)
                    showErrorMsg(`Could not remove mail (${currMail.id})`)
                })
        }
    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...fieldsToUpdate }))
    }

    function onOpenMail(mailId) {
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
    return <section className="mailapp-main-layout flex">

        <section className="menu-layout flex column">
            <div className="gmail-logo-container flex align-center">
                <img className="hamburger" src="../assets/img/hamburger.png" alt="" title="Main Menu" onClick={() => showSuccessMsg('Please update software version')} />
                <img className="gmail-logo" src="../assets/img/gmail-logo.png" alt="" />
            </div>
            <div className="open-modal-btn-container flex align-center">
                {openModal && <Compose mail={mail} setMail={setMail} handleSubmit={handleSubmit} handleChange={handleChange} setOpenModal={setOpenModal} showSuccessMsg={showSuccessMsg} />}
                <button className="open-modal-btn flex align-center"
                    onClick={() => {
                        setOpenModal(true)
                    }}>
                    <div className="pen-container flex justify-center align-center">
                        <span className="fa pen-icon"></span>
                    </div>
                    <div className="open-modal-btn-text">
                        Compose
                    </div>
                </button>

            </div>
            <FilterMenu filterBy={{ mailStatus, lables }} onSetFilter={onSetFilter} unreadCount={unreadCount} />
        </section>

        <section className="flex column">
            <div className="search-container flex align-center">
                <MailFilter filterBy={{ txt }} onSetFilter={onSetFilter} getDefaultFilter={mailService.getDefaultFilter} />
            </div>
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
                countUnread={countUnread}
                onOpenMail={onOpenMail}
                toggleRead={toggleRead}
                showSuccessMsg={showSuccessMsg} />
        </section>

        <UserMsg />
    </section>
}