const { useState } = React
import { noteService } from "../services/note.service.js"

export function NoteImgAdd({ addNote, type }) {
  const [noteInfo, setNoteInfo] = useState({
    title: "",
    imgUrl: "",
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
    setNoteInfo({ title: "", imgUrl: "" })
  }

  function handleChange({ target }) {
    const { name: field, value } = target
    setNoteInfo({ ...noteInfo, [field]: value })
  }

  return (
    <React.Fragment>
      <form className="flex column" onSubmit={onAddNote}>
        <input
          className="title-input"
          onChange={handleChange}
          type="text"
          placeholder="Enter title..."
          name="title"
          id="title"
          value={noteInfo.title}
        />
        <input
          required
          onChange={handleChange}
          type="text"
          className="imgUrl"
          placeholder="Enter image url..."
          name="imgUrl"
          id="imgUrl"
          value={noteInfo.imgUrl}
        />
        <button hidden type="submit">
          +
        </button>
      </form>
    </React.Fragment>
  )
}
