const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, isRead, handleIsRead, onRemoveMail }) {

    if (!mails || !mails.length) {
        return <div className="nothing-to-show">Loading...</div>
    }

    return <ul className="mail-list">
        {mails.map(mail => (
            <MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} isRead={isRead} handleIsRead={handleIsRead}/>
        ))}
    </ul>
}
