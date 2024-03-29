const { useState } = React

import { NotePreviewButtons } from "./NotePreviewButtons.jsx"
import { NoteEdit } from "./NoteEdit.jsx"
import { UserMsg } from "../../../cmps/UserMsg.jsx"

import { noteService } from "../services/note.service.js"
import {
  showSuccessMsg,
  showErrorMsg,
} from "../../../services/event-bus.service.js"

export function NoteVideo({
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

  function getVideoId(url) {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regExp)

    if (match && match[1]) {
      return match[1]
    } else {
      return null
    }
  }

  function getYoutubeEmbedUrl(url) {
    const videoId = getVideoId(url)
    const EmbedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null
    return EmbedUrl
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

  const embedUrl = getYoutubeEmbedUrl(note.info.youtubeUrl)

  return (
    <article className="note-preview" style={noteBgColor}>
      <h2>{note.info.title}</h2>
      {embedUrl && <iframe src={embedUrl} width="200" height="200"></iframe>}

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
