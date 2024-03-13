const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link, Outlet } = ReactRouterDOM

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
    return <section>
        <h1>Subject: {mail.subject}</h1>
        <h5>From: {mail.from}</h5>
        <p>{mail.body}</p>
    </section>
}