export function MailPreview({ mail }) {
    return <div className='mail-subject flex'>
<input type="checkbox" />
<div className={`mail-from ${(mail.isRead) ? '' : 'bold'}`}>{mail.from}</div>
<div className={`mail-subject ${(mail.isRead) ? '' : 'bold'}`}>{mail.subject}{mail.body.substring(0, 20)}</div>
</div>
}