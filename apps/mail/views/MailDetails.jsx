const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        setIsLoading(true)
        mailService
            .get(params.mailId)
            .then(mail => setMail(mail))
            .catch((err) => {
                console.log('Had issues loading mail', err)
                navigate('/mails')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    if (isLoading) return <div>Loading...</div>
    return <article className="mail-details-container">
        <div className="go-back-button">
            <Link to="/mails">Back
            </Link>
        </div>
        <div className="mail-details-title flex space-between">
            <h1>Subject: {mail.subject}</h1>
            <div className="mail-actions">
                <button className="fa trash trash-in-mail" title="delete email"></button>
            </div>
        </div>
        <div>
        </div>
        <div className="mail-details-content">
            <h5>From: {mail.from}</h5>
            <p>{mail.body}</p>
        </div>
    </article>
}