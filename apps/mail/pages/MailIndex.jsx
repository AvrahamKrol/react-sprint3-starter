const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'

import { MailPreview } from "../cmps/MailPreview.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { MailDetails } from "../cmps/MailDetails.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
// import { MailFolderList } from "../cmps/MailFolderList.jsx";
// import { MailCompose } from "../cmps/MailCompose.jsx";

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isShown, setIsShown] = useState(false)
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query().then((data) => {
            setMails(data)
        })
    }
    return <section className="mail-index">
        <img className="gmail-logo" src={"../../assets/img/Gmail-with-Text.svg"} />
        <section className='sidebar'>
            <label className='active'>Incoming</label>
        </section>
        <MailList mails={mails} />
        {/* <MailPreview />
        <MailDetails />
        <MailFilter /> */}
    </section>
}