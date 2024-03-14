const { useState } = React

import { noteService } from "../services/note.service.js"

export function NoteVideoAdd({ addNote, type }) {
  const [noteInfo, setNoteInfo] = useState({
    title: "",
    youtubeUrl: "",
  })

  function onAddNote(ev) {
    ev.preventDefault()
    const emptyNote = noteService.getEmptyNote()
    const noteToAdd = {
      ...emptyNote,
      info: { ...emptyNote.info, ...noteInfo },
      type,
    }
    addNote(noteToAdd)
    setNoteInfo({ title: "", youtubeUrl: "" })
  }

  function handleChange({ target }) {
    const { name: field, value } = target
    setNoteInfo({ ...noteInfo, [field]: value })
  }

  return (
    <React.Fragment>
      <form onSubmit={onAddNote}>
        <input
          required
          className="title-input"
          onChange={handleChange}
          type="text"
          placeholder="Title"
          name="title"
          id="title"
          value={noteInfo.title}
        />
        <input
          onChange={handleChange}
          type="text"
          className="youtubeUrl"
          placeholder="Enter  youtube url..."
          name="youtubeUrl"
          id="youtubeUrl"
          value={noteInfo.youtubeUrl}
        />
        <button type="submit">+</button>
      </form>
    </React.Fragment>
  )
}
