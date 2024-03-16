const { Link } = ReactRouterDOM
const { useState } = React

export function MailPreview({ mail, handleIsRead, onRemoveMail, countUnread, toggleRead, onOpenMail, showSuccessMsg }) {
    const [isRead, setIsRead] = useState(mail.isRead)

    function handleIsRead() {
        setIsRead((isRead) => !isRead)
        toggleRead(mail.id, mail.isRead)
        countUnread()
    }


    return (
        <li className={`flex space-between pointer {${(isRead) ? 'read' : ''}`}>
            <div className="inputs flex">
                <input type="checkbox" />
                <input type="checkbox" className="fa star" />
                <div className={`mail-from ${(isRead) ? '' : 'bold'}`}
            onClick={() => onOpenMail(mail.id)}>
                    <Link to={`/mails/${mail.id}`}>
                        {(mail.from) ? `${mail.from}` : 'Me'}
                    </Link>
                </div>
            </div>
            <div className={`mail-subject flex space-between`} onClick={() => onOpenMail(mail.id)}>
                <div className={`${(isRead) ? '' : 'bold'}`}>
                    <Link to={`/mails/${mail.id}`} >
                        {mail.subject}
                    </Link>
                </div>
                <Link to={`/mails/${mail.id}`}>
                    {mail.body.substring(0, 50)}
                </Link>
            </div>

            <div className="mail-actions">
                <button className='fa envelope' onClick={handleIsRead}></button>
                <button className='fa forward' onClick={() => showSuccessMsg('Please update software version')}></button>
                <button className='fa trash' onClick={() => onRemoveMail(mail)}></button>
            </div>
        </li >
    )
}