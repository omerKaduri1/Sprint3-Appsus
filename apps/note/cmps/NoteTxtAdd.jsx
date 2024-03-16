const { useState } = React

import { noteService } from "../services/note.service.js"
export function NoteTxtAdd({ addNote, type }) {
  const [noteInfo, setNoteInfo] = useState({ txt: "" })

  function handleChange({ target }) {
    const { name: field, value } = target
    setNoteInfo((prevNoteInfo) => ({ ...prevNoteInfo, [field]: value }))
  }

  function onAddNote(ev) {
    ev.preventDefault()
    const emptyNote = noteService.getEmptyNote()
    const noteToAdd = { ...emptyNote, info: { ...emptyNote.info, ...noteInfo } }
    addNote(noteToAdd)
    setNoteInfo({ txt: "" })
  }

  return (
    <form className="add-text flex column" onSubmit={onAddNote}>
      <input
        title="add note"
        type="text"
        className="txt-input"
        name="txt"
        id="txt"
        placeholder="Enter new note..."
        onChange={handleChange}
        value={noteInfo.txt}
      />
    </form>
  )
}
