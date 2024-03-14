const { Link } = ReactRouterDOM
const { useState } = React

export function MailPreview({ mail, handleIsRead, onRemoveMail }) {
    const [isRead, setIsRead] = useState(mail.isRead)

    function handleIsRead() {
        setIsRead((isRead) => !isRead)
        mail.isRead = isRead
    }

    return <li className={`flex space-between`}>
        <div className="inputs flex">
            <input type="checkbox" className="fa star" />
            <input type="checkbox" />
            <Link to={`/mails/${mail.id}`}>
                <div className={`mail-from ${(isRead) ? '' : 'bold'}`}>
                    {(mail.from) ? `${mail.from}` : 'Me'}
                </div>
            </Link>
        </div>
        <div className={`mail-subject flex space-between`}>
            <div className={`${(isRead) ? '' : 'bold'}`}>
                {mail.subject}
            </div>
            {mail.body.substring(0, 50)}
        </div>

        <div className="mail-actions">
            <button className='fa envelope' onClick={handleIsRead}></button>
            <button className='fa forward'></button>
            <button className='fa trash' onClick={() => onRemoveMail(mail.id)}></button>
        </div>
    </li>
}