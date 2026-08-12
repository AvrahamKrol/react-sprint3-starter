import { MailPreview } from "../cmps/MailPreview.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { MailDetails } from "../cmps/MailDetails.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailFolderList } from "../cmps/MailFolderList.jsx";
import { MailCompose } from "../cmps/MailCompose.jsx";

export function MailIndex() {
    return <section className="container">
        <h1>Mail app</h1>
        <MailPreview />
        <MailList />
        <MailDetails />
        <MailFilter />
        <MailFolderList />
        <MailCompose />
    </section>
}

