import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
// const SENT_KEY = 'sentDB'

export const mailService = {
    query,
    get,
    remove,
    save,
    send,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromParams,
}

_creatEmails()

function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.from) || regex.test(mail.body) || regex.test(mail.to))
            }
            if (filterBy.mailStatus) {
                mails = mails.filter(mail => mail.mailStatus === filterBy.mailStatus)
            }
            if (filterBy.isRead) {
                // mails = mails.filter(mail => mail.isRead)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevmailId(mail))
    // return axios.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail = _creatEmail()
        return storageService.post(MAIL_KEY, mail)
    }
}

function send(mail) {
    mail.id = utilService.makeId()
    mail.mailStatus = 'sent'
    return storageService.post(MAIL_KEY, mail)
}

function getEmptyMail() {
    const email = {
        id: utilService.makeId(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: 0,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        mailStatus: 'inbox'
    }
    return email
}

function getDefaultFilter() {
    return {
        mailStatus: 'inbox',
        txt: '',
        isRead: null,
        isStared: null,
        lables: ['important', 'romantic']
    }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        txt: searchParams.get('txt') || defaultFilter.txt,
        mailStatus: searchParams.get('mailStatus') || defaultFilter.mailStatus,
        isStared: searchParams.get('isStared') || defaultFilter.isStared,
        isRead: searchParams.get('isRead') || defaultFilter.isRead,
        lables: searchParams.get('lables') || defaultFilter.lables
    }
}

function _creatEmail() {
    const mail = getEmptyMail()
    mail.subject = utilService.makeLorem(2)
    mail.body = utilService.makeLorem(100)
    mail.isRead = (Math.random() > 0.5)
    return mail
}

function _setNextPrevmailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currmail) => currmail.id === mail.id)
        const nextmail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevmail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextmailId = nextmail.id
        mail.prevmailId = prevmail.id
        return mail
    })
}

function _creatEmails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                subject: 'omerKaduri1 invited you to omerKaduri1/Sprint3-Appsus',
                body: utilService.makeLorem(100),
                isRead: false,
                sentAt: 0,
                removedAt: null,
                from: 'omerKaduri1',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'You\'re Invited. Apply today for $300 AWS credits',
                body: utilService.makeLorem(123),
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'Amazon Web Services',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'Last week\'s updates in your shared folders',
                body: utilService.makeLorem(94),
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'Dropbox',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'Welcome to TMDB!',
                body: utilService.makeLorem(100),
                isRead: false,
                sentAt: 0,
                removedAt: null,
                from: 'The Movie Database',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'Code for signing in to Zoom',
                body: utilService.makeLorem(100),
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'Zoom',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'Your verification link',
                body: utilService.makeLorem(120),
                isRead: false,
                sentAt: 0,
                removedAt: null,
                from: 'Booking.com',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'Global Sale Extended ✨up to 40% OFF',
                body: utilService.makeLorem(114),
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'Selina',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'New login to Spotify',
                body: utilService.makeLorem(120),
                isRead: false,
                sentAt: 0,
                removedAt: null,
                from: 'Spotify',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'הודעה מפורום הקורס "תורת המימון" בנושא "בהצלחה בבחינה "',
                body: utilService.makeLorem(130),
                isRead: false,
                sentAt: 0,
                removedAt: null,
                from: 'Open University',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'YoungLA, Our V-Day Drop just went LIVE!!',
                body: utilService.makeLorem(120),
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'YoungLA',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'Pancake Recipe',
                body: utilService.makeLorem(100),
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'Me',
                to: 'user@appsus.com',
                mailStatus: 'sent'
            },
            {
                id: utilService.makeId(),
                subject: 'Your invoice from Apple.',
                body: utilService.makeLorem(120),
                isRead: false,
                sentAt: 0,
                removedAt: null,
                from: 'Apple',
                to: 'user@appsus.com',
                mailStatus: 'inbox'
            },
            {
                id: utilService.makeId(),
                subject: 'ORDER #YLA2659465',
                body: '',
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'Me',
                to: 'user@appsus.com',
                mailStatus: 'sent'
            },
            {
                id: utilService.makeId(),
                subject: 'My favorite foods',
                body: utilService.makeLorem(100),
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'Me',
                to: 'user@appsus.com',
                mailStatus: 'sent'
            },
            {
                id: utilService.makeId(),
                subject: 'Amit Frid CV',
                body: utilService.makeLorem(120),
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'Me',
                to: 'user@appsus.com',
                mailStatus: 'sent'
            },
            {
                id: utilService.makeId(),
                subject: 'Master Advanced Stack Skills',
                body: utilService.makeLorem(100),
                isRead: false,
                sentAt: 0,
                removedAt: null,
                from: 'Simplilearn',
                to: 'user@appsus.com',
                mailStatus: 'trash'
            },
            {
                id: utilService.makeId(),
                subject: 'Reset password instructions',
                body: utilService.makeLorem(100),
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'no-reply',
                to: 'user@appsus.com',
                mailStatus: 'trash'
            },
            {
                id: utilService.makeId(),
                subject: 'FW: אתר בחירה - תווי שי לחג הפסח',
                body: utilService.makeLorem(80),
                isRead: false,
                sentAt: 0,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                mailStatus: 'trash'
            },
            {
                id: utilService.makeId(),
                subject: 'Email verification required',
                body: utilService.makeLorem(120),
                isRead: true,
                sentAt: 0,
                removedAt: null,
                from: 'Me',
                to: 'user@appsus.com',
                mailStatus: 'sent'
            },
        ]

        mails.push(_creatEmail())
        mails.push(_creatEmail())
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    return mails
}
