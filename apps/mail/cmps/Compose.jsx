import { utilService } from "../../../services/util.service.js"

const { useState } = React

export function Compose({ setOpenModal, onSendMail }) {
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
        <form onSubmit={handleSubmit}>
            <div className="title-cotainer">
                <h2>New Message</h2>
                <button onClick={() => setOpenModal(false)}>X</button>
            </div>
            <div className="form-container">
                <div className="input-container">
                    <label htmlFor="to">To</label>
                    <input
                        type="email"
                        id="to"
                        name="to"
                        value={mail.to}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={mail.subject}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="content"
                        name="content"
                        className="content"
                        value={mail.body}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="send-compose-btn-container">
                <button className="send-compose-btn" onClick={() => setOpenModal(false)}>Send</button>
            </div>
        </form>
    </div>
}