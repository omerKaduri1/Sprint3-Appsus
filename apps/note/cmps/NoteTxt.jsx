const { useState } = React

import { NotePreviewButtons } from "./NotePreviewButtons.jsx"
import { NoteEdit } from "./NoteEdit.jsx"
import { UserMsg } from "../../../cmps/UserMsg.jsx"

import { noteService } from "../services/note.service.js"
import {
  showSuccessMsg,
  showErrorMsg,
} from "../../../services/event-bus.service.js"

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
    noteService
      .save(note)
      .then((savedNote) => {
        setNoteBgColor({ backgroundColor: color })
        showSuccessMsg(`Note's color changed successfully`)
      })
      .catch((err) => {
        showErrorMsg(`Could not change note's color`)
      })
  }

  function onSetEdit() {
    setIsOnEdit((prevIsOnEdit) => {
      return !prevIsOnEdit
    })
  }

  function duplicateNote(note) {
    const duplicatedNote = { ...note, id: null }
    noteService
      .save(duplicatedNote)
      .then((savedNote) => {
        setNotes((prevNotes) => [...prevNotes, savedNote])
        showSuccessMsg(`Note duplicated successfully`)
      })
      .catch((err) => {
        showErrorMsg(`Could not duplicate note`)
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

      <UserMsg />
    </article>
  )
}
