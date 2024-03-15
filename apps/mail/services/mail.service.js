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
        console.log('mail:', mail)
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

//NEEDS DEFINITION
function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        txt: searchParams.get('txt') || defaultFilter.txt,
        status: searchParams.get('mailStatus') || defaultFilter.mailStatus,
        isStared: searchParams.get('isStared') || defaultFilter.isStared,
        isRead: searchParams.get('isRead') || defaultFilter.isRead,
        lables: searchParams.get('lables') || defaultFilter.lables
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