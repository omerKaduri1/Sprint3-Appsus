export function MailPreview({ mail }) {
    return <div className='mail-subject flex'>
            <div className={`mail-subject ${(mail.isRead) ? '' : 'bold'}`}>
                {mail.subject}{mail.body.substring(0, 20)}
            </div>
    </div>
}