const { useState, useEffect } = React

import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"


export function MailIndex() {
    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(setMails)
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




    return <section className="books-container">

        {/* <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
        <MailList mails={mails} onRemoveMail={onRemoveMail} />
    </section>
}
