const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, isRead, handleIsRead, onRemoveMail, countUnread, toggleRead }) {

    if (!mails || !mails.length) {
        return <div className="nothing-to-show">Inbox is empty</div>
    }

    return <ul className="mail-list">
        {mails.map(mail => (
            <MailPreview key={mail.id}
             mail={mail}
            onRemoveMail={onRemoveMail}
            isRead={isRead}
            handleIsRead={handleIsRead}
            countUnread={countUnread}
            toggleRead={toggleRead}/>
        ))}
    </ul>
}
