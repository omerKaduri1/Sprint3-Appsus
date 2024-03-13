const { useState } = React
import { ColorButtons } from "./ColorButtons.jsx"

import { noteService } from "../services/note.service.js"

export function NotePreview({
  note,
  removeNote,
  editNote,
}) {
  const [noteBgColor, setNoteBgColor] = useState(note.style)
  function onRemoveNote(noteId) {
    removeNote(noteId)
  }

  function changeBackgroundColor(note, color) {
    const style = { backgroundColor: color }
    note = { ...note, style }
    noteService.save(note)
    setNoteBgColor({backgroundColor: color})
  }
  return (
    <article
      onClick={() => {
        editNote(note)
      }}
      className="note-preview"
      style={noteBgColor}
    >
      <h2>{note.info.title}</h2>
      <p>{note.info.txt}</p>
      <section className="note-btns">
        <ColorButtons
          note={note}
          changeBackgroundColor={changeBackgroundColor}
        />
        <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>
          X
        </button>
      </section>
    </article>
  )
}
