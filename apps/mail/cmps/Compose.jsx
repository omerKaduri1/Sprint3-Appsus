const { useState } = React

export function Compose({ openModal, setOpenModal, onSendMail }) {
    const [from, setFrom] = useState('')
    return <div className="compose-modal">
        <h2>New Message</h2>
        <form onSubmit={() => onSendMail(mail)}>
            <button onClick={() => setOpenModal(false)}>X</button>
            <div className="form-container">
                <label htmlFor="from">From</label>
                <input
                    type="email"
                    id="from"
                    name="from"
                    value={from}
                    onChange={(ev) => setFrom(ev.target.value)}
                />

                <label htmlFor="to">To</label>
                <input
                    type="email"
                    id="to"
                    name="to" />

                <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    id="subject"
                    name="subject" />

                <input
                    type="text"
                    id="content"
                    name="content" />
            </div>
            <p>{from}</p>
        </form>
        <button onClick={() => setOpenModal(false)}>Send</button>
    </div>
}