const { Link } = ReactRouterDOM
const { useState } = React

import { mailService } from '../services/mail.service.js'


export function MailPreview({ mail }) {
    const [isRead, setIsRead] = useState(mail.isRead)

    function handleIsRead() {
        setIsRead((isRead) => !isRead)
    }



    return <li key={mail.id} className={`flex space-between`}>
        <div className="inputs flex">
            <input type="checkbox" className="fa star" />
            <input type="checkbox" />
            <Link to={`/mails/${mail.id}`}>
                <div className={`mail-from ${(isRead) ? '' : 'bold'}`}>
                    {mail.from}
                </div>
            </Link>
        </div>
        <div className='mail-subject flex'>
            <div className={`mail-subject ${(isRead) ? '' : 'bold'}`}>
                {mail.subject}{mail.body.substring(0, 20)}
            </div>
            {/* <Link to={`/mails/${mail.id}`}>
                    <MailPreview mail={mail} />
                </Link> */}

            <div className="mail-actions">
                <button className='fa envelope' onClick={handleIsRead}></button>
                <button className='fa forward'></button>
                <button className='fa trash' onClick={() => onRemoveMail(mail.id)}></button>
            </div>
        </div >
    </li>
}