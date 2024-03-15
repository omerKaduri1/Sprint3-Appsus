const { useState } = React

import { NotePreviewButtons } from "./NotePreviewButtons.jsx"
import { NoteEdit } from "./NoteEdit.jsx"

import { noteService } from "../services/note.service.js"

export function NoteTxt({
  note,
  removeNote,
  saveNote,
  setNotes,
  setPinnedNotes,
}) {
  const [noteBgColor, setNoteBgColor] = useState(note.style)
  const [isOnEdit, setIsOnEdit] = useState(false)
  const [isNotePinned, setIsNotePinned] = useState(note.isPinned)

  function changeBackgroundColor(note, color) {
    const style = { backgroundColor: color }
    note = { ...note, style }
    noteService.save(note)
    setNoteBgColor({ backgroundColor: color })
  }

  function onSetEdit() {
    setIsOnEdit((prevIsOnEdit) => {
      return !prevIsOnEdit
    })
  }

  return (
    <article className="note-preview" style={noteBgColor}>
      <p>{note.info.txt}</p>
      <section className="note-btns">
        <NotePreviewButtons
          note={note}
          removeNote={removeNote}
          changeBackgroundColor={changeBackgroundColor}
          onSetEdit={onSetEdit}
          setIsNotePinned={setIsNotePinned}
          setNotes={setNotes}
          setPinnedNotes={setPinnedNotes}
        />
      </section>

      {isOnEdit && (
        <NoteEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )}
    </article>
  )
}
