export function Compose({ mail, setOpenModal, handleSubmit, handleChange, showSuccessMsg }) {

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
                        required
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
                        required
                    />
                </div>
                <div>
                    <textarea 
                        type="text"
                        id="content"
                        name="body"
                        className="content"
                        value={mail.body}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="send-compose-btn-container">
                <button className="send-compose-btn" onClick={() => showSuccessMsg('Mail sent successfully')}>Send</button>
            </div>
        </form>
    </div>
}