const { useState } = React
import { ColorButtons } from "./ColorButtons.jsx"

export function NotePreviewButtons({
  note,
  removeNote,
  editNote,
  changeBackgroundColor,
}) {
  const [isNotePinned, setIsNotePinned] = useState(note.isPinned)
  function onRemoveNote(noteId) {
    removeNote(noteId)
  }

  function togglePin() {
    setIsNotePinned((prevIsPinned) => !prevIsPinned)
  }

  function onEditNote() {
    editNote(note)
  }

  return (
    <section className="preview-btns">
      <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>
        X
      </button>
      <button onClick={togglePin}>Pin</button>
      <button className="edit-btn" onClick={onEditNote}>
      <i className="fa-regular fa-pen-to-square"></i>
      </button>
      <ColorButtons note={note} changeBackgroundColor={changeBackgroundColor} />
    </section>
  )
}
