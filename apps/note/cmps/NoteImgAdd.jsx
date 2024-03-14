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
    const noteToAdd = { ...emptyNote, info: { ...emptyNote.info, ...noteInfo }, type }
    addNote(noteToAdd)
    console.log(noteInfo);
    setNoteInfo({ title: "", imgUrl: "" })
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
          className="imgUrl"
          placeholder="Enter image url..."
          name="imgUrl"
          id="imgUrl"
          value={noteInfo.imgUrl}
        />
        <button type="submit">+</button>
      </form>
    </React.Fragment>
  )
}
