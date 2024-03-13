const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'


export function MailList({ mails, onRemoveMail }) {
    if (!mails || !mails.length)
        return <div className="nothing-to-show">Loading...</div>

    return <ul className="mail-list clean-list">
        {mails.map(mail => (
            <li key={mail.id} className={`flex space-between`}
            >
                
                


                <Link to={`/mails/${mail.id}`}>
                    <MailPreview mail={mail} />
                </Link>

                <div className="mail-actions flex">
                    <button className='fa envelope'></button>
                    <button className='fa forward'></button>
                    <button className='fa trash' onClick={() => onRemoveMail(mail.id)}></button>
                </div>
            </li>
        ))}
    </ul>
}
