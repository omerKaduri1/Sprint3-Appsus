import { ColorButtons } from "./ColorButtons.jsx"

export function NotePreviewButtons({
  note,
  removeNote,
  editNote,
  changeBackgroundColor,
  onSetEdit,
  setIsNotePinned,
}) {
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
        <i className="fa-regular fa-trash-can"></i>
      </button>
      <button onClick={togglePin}>
        <i className="fa-solid fa-thumbtack"></i>
      </button>
      <button className="edit-btn" onClick={onSetEdit}>
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
      <ColorButtons note={note} changeBackgroundColor={changeBackgroundColor} />
    </section>
  )
}
