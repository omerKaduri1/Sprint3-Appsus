import { utilService } from "../../../services/util.service.js"

const { useState } = React

export function Compose({ openModal, setOpenModal, onSendMail }) {
    const [mail, setMail] = useState({ status: 'sent' })

    function handleChange({ target }) {
        let { value, name: field } = target
        setMail(prevMailDetails => ({
            ...prevMailDetails,
            [field]: value,
        }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSendMail(mail)
    }


    return <div className="compose-modal">
        <h2>New Message</h2>
        <form onSubmit={handleSubmit}>
            <button onClick={() => setOpenModal(false)}>X</button>
            <div className="form-container">
                <label htmlFor="from">From</label>
                <input
                    type="email"
                    id="from"
                    name="from"
                    value={mail.from}
                    onChange={handleChange}
                />

                <label htmlFor="to">To</label>
                <input
                    type="email"
                    id="to"
                    name="to"
                    value={mail.to}
                    onChange={handleChange}
                />

                <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={mail.subject}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    id="content"
                    name="content"
                    value={mail.body}
                    onChange={handleChange}
                />
            </div>
            <button onClick={() => setOpenModal(true)}>Send</button>
        </form>
    </div>
}