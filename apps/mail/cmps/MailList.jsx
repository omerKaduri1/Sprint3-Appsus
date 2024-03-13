const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'


export function MailList({ mails, onRemoveMail }) {
    console.log('mails:', mails)
    if (!mails || !mails.length)
        return <div className="nothing-to-show">Loading...</div>

    return <ul className="mail-list clean-list">
        {mails.map(mail => (
            <li key={mail.id} className="flex align-center space-between">
                <Link to={`/mails/${mail.id}`}>
                    <MailPreview mail={mail} />
                </Link>
                <div className="mail-actions">

                    <button onClick={() => onRemoveMail(mail.id)}>Remove</button>
                </div>
            </li>
        ))}
    </ul>
}
