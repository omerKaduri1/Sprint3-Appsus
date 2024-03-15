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
  openPaletteNoteId,
  setOpenPaletteNoteId,
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

  function duplicateNote(note) {
    const duplicatedNote = { ...note, id: null }
    noteService.save(duplicatedNote).then((savedNote) => {
      setNotes((prevNotes) => [...prevNotes, savedNote])
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
          duplicateNote={duplicateNote}
          openPaletteNoteId={openPaletteNoteId}
          setOpenPaletteNoteId={setOpenPaletteNoteId}
        />
      </section>

      {isOnEdit && (
        <NoteEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )}
    </article>
  )
}
