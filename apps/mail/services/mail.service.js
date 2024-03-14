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
            if (filterBy.status) {
                mails = mails.filter(mail => mail.status === filterBy.status)
            }
            if (filterBy.desc) {
                const regex = new RegExp(filterBy.desc, 'i')
                mails = mails.filter(mail => regex.test(mail.desc))
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
    mail.status = 'sent'
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
        status: 'inbox'
    }
    return email
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: true,
        isStared: true,
        lables: ['important', 'romantic']
    }
}

//NEEDS DEFINITION
function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        txt: searchParams.get('txt') || defaultFilter.txt,
        minSpeed: searchParams.get('minSpeed') || defaultFilter.minSpeed,
        desc: searchParams.get('desc') || defaultFilter.desc
    }
}

function _creatEmails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_creatEmail())
        mails.push(_creatEmail())
        mails.push(_creatEmail())
        mails.push(_creatEmail())
        mails.push(_creatEmail())
        mails.push(_creatEmail())
        mails.push(_creatEmail())
        mails.push(_creatEmail())
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    return mails
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