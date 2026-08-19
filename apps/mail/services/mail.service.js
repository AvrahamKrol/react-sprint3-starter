import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

export const mailService = {
    query,
    getEmptyMail,
}

const MAIL_KEY = 'mailDB'

_createMails()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const filterBy = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

function query() {
    return storageService.query(MAIL_KEY).then((mails) => {
        return mails
    })
}

function getEmptyMail() {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: false,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {

        mails = []
        for (var i = 0; i < 5; i++) {
            const note = _createMail()
            mails.push(note)
        }

    }
    utilService.saveToStorage(MAIL_KEY, mails)
}

function _createMail() {
    return {
        id: utilService.makeId(),
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
}