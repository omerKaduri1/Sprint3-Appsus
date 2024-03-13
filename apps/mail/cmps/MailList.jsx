const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'


export function MailList({ mails, onRemoveMail }) {
    if (!mails || !mails.length) {
        return <div className="nothing-to-show">Loading...</div>
    }

    return <ul className="mail-list clean-list">
        {mails.map(mail => (
            <li key={mail.id} className={`flex space-between`}>
                <div className="inputs flex">
                    <input type="checkbox" className="fa star" />
                    <input type="checkbox" />
                    <Link to={`/mails/${mail.id}`}>
                        <div className={`mail-from ${(mail.isRead) ? '' : 'bold'}`}>
                            {mail.from}
                        </div>
                    </Link>
                </div>

                <Link to={`/mails/${mail.id}`}>
                    <MailPreview mail={mail} />
                </Link>

                <div className="mail-actions">
                    <button className='fa envelope'></button>
                    <button className='fa forward'></button>
                    <button className='fa trash' onClick={() => onRemoveMail(mail.id)}></button>
                </div>
            </li>
        ))}
    </ul>
}
