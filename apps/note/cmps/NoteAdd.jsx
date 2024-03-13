const { useState } = React

import { noteService } from "../services/note.service.js"

export function NoteAdd({ addNote }) {
  const [noteInfo, setNoteInfo] = useState({ title: "", txt: "" })

  function onAddNote(ev) {
    ev.preventDefault()
    const emptyNote = noteService.getEmptyNote()
    const noteToAdd = { ...emptyNote, info: { ...emptyNote.info, ...noteInfo } }
    console.log("noteToAdd:", noteToAdd)
    addNote(noteToAdd)
  }

  function handleChange({ target }) {
    const { name: field, value } = target
    setNoteInfo((prevNoteInfo) => ({ ...prevNoteInfo, [field]: value }))
    console.log("noteInfo:", noteInfo)
  }

  return (
    <section className="add-note">
      {/* <article> */}
        <form className="add-text flex column" onSubmit={onAddNote}>
          <input
            className="title-input"
            required
            placeholder="Title"
            onChange={handleChange}
            value={noteInfo.title}
            name="title"
            id="title"
            type="text"
          />

          <textarea
            className="txt-input"
            name="txt"
            id="txt"
            placeholder="Enter your note..."
            onChange={handleChange}
            value={noteInfo.txt}
            cols="30"
            rows="3"
          />

          <section className="actions-container">
            <button className="add-note-btn" type="submit">
              +
            </button>
          </section>
        </form>
      {/* </article> */}
    </section>
  )
}
