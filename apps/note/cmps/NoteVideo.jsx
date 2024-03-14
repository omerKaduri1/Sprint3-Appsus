import { NotePreviewButtons } from "./NotePreviewButtons.jsx"

export function NoteVideo({
  note,
  removeNote,
  editNote,
  changeBackgroundColor,
}) {
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

  const embedUrl = getYoutubeEmbedUrl(note.info.youtubeUrl)

  return (
    <article className="note-preview" style={note.style}>
      <h2>{note.info.title}</h2>
      {embedUrl && <iframe src={embedUrl} width="200" height="200"></iframe>}

      <section className="note-btns">
        <NotePreviewButtons
          note={note}
          removeNote={removeNote}
          editNote={editNote}
          changeBackgroundColor={changeBackgroundColor}
        />
      </section>
    </article>
  )
}
