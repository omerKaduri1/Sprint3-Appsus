import { utilService } from "../../../services/util.service"

const { useState } = React

export function Compose({ openModal, setOpenModal, sendMail }) {
    const [mail, setMail] = useState({})

    function handleChange({ target }) {
        let { value, name: field } = target
        setMail(prevMailDetails => ({
            ...prevMailDetails,
            [field]: value,
        }))
    }
    
    function onSendMail(ev) {
        ev.preventDefault()
        sendMail(mail)
    }

    return <div className="compose-modal">
        <h2>New Message</h2>
        <form onSubmit={onSendMail}>
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
        </form>
        <button onClick={() => setOpenModal(false)}>Send</button>
    </div>
}