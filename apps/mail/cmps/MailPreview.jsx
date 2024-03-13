export function MailPreview({ mail }) {
    return <article className={(mail.isRead) ? '' : 'bold'}>
        {mail.subject}
    </article>
}