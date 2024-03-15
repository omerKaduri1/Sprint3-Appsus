const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, isRead, handleIsRead, onRemoveMail, countUnread, toggleRead, onOpenMail }) {

    if (!mails || !mails.length) {
        return <div className="nothing-to-show">Nothing to show</div>
    }

    return <ul className="mail-list">
        {mails.map(mail => (
            <MailPreview key={mail.id}
            mail={mail}
            onOpenMail={onOpenMail}
            onRemoveMail={onRemoveMail}
            isRead={isRead}
            handleIsRead={handleIsRead}
            countUnread={countUnread}
            toggleRead={toggleRead}/>
        ))}
    </ul>
}
