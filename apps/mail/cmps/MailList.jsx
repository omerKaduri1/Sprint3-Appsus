const { Link } = ReactRouterDOM



import { MailPreview } from './MailPreview.jsx'



export function MailList({ mails, onRemoveMail }) {



    if (!mails || !mails.length) {
        return <div className="nothing-to-show">Loading...</div>
    }

    return <ul className="mail-list">
        {mails.map(mail => (
            <MailPreview mail={mail}/>
        ))}
    </ul>
}
