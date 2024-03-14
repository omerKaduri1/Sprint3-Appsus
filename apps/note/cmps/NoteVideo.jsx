const { useState } = React

import { NotePreviewButtons } from "./NotePreviewButtons.jsx"
import { NoteEdit } from "./NoteEdit.jsx"

import { noteService } from "../services/note.service.js"

export function NoteVideo({
  note,
  removeNote,
  saveNote,
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
        />
      </section>

      {isOnEdit && (
        <NoteEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )}
    </article>
  )
}
