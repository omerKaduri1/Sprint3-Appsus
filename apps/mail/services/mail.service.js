import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromParams
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            // if (filterBy.txt) {
            //     const regex = new RegExp(filterBy.txt, 'i')
            //     mails = mails.filter(mail => regex.test(mail.vendor))
            // }
            // if (filterBy.minSpeed) {
            //     mails = mails.filter(mail => mail.maxSpeed >= filterBy.minSpeed)
            // }
            // if (filterBy.desc) {
            //     const regex = new RegExp(filterBy.desc, 'i')
            //     mails = mails.filter(mail => regex.test(mail.desc))
            // }
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
        mail = _creatEmail(mail.vendor, mail.maxSpeed)
        return storageService.post(MAIL_KEY, mail)
    }
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
        to: 'user@appsus.com'
    }
    return email
}

//NEEDS DEFINITION
function getDefaultFilter() {
    return { txt: '', minSpeed: 50, desc: '' }
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