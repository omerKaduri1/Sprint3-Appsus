import { noteService } from "../services/note.service.js"
import { ColorButtons } from "./ColorButtons.jsx"

export function NotePreviewButtons({
  note,
  removeNote,
  changeBackgroundColor,
  onSetEdit,
  setIsNotePinned,
  setNotes,
  setPinnedNotes,
  duplicateNote
}) {
  function onRemoveNote(noteId) {
    removeNote(noteId)
  }

  function togglePin(note) {
    const updatedNote = { ...note, isPinned: !note.isPinned }
    setIsNotePinned((prevIsPinned) => !prevIsPinned)
    if (updatedNote.isPinned) {
      setPinnedNotes((prevPinnedNotes) => [...prevPinnedNotes, updatedNote])
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== updatedNote.id)
      )
    } else {
      setPinnedNotes((prevPinnedNotes) =>
        prevPinnedNotes.filter((note) => note.id !== updatedNote.id)
      )
      setNotes((prevNotes) => [...prevNotes, updatedNote])
    }
    noteService.save(updatedNote)
  }

  function onNoteDuplicate() {
    duplicateNote(note)
  }

  return (
    <section className="preview-btns">
      <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>
        <i className="fa-regular fa-trash-can"></i>
      </button>
      <button onClick={() => togglePin(note)}>
        <i className="fa-solid fa-thumbtack"></i>
      </button>
      <button className="edit-btn" onClick={onSetEdit}>
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
      <button className='duplicate-btn' onClick={onNoteDuplicate}>
      <i className="fa-regular fa-copy"></i>
      </button>
      <ColorButtons note={note} changeBackgroundColor={changeBackgroundColor} />
    </section>
  )
}
