export function NotePreview({ note }) {
  return (
    <article className="note-preview" style={note.style}>
      <h2>{note.info.title}</h2>
      <p>{note.info.txt}</p>
      <section className="note-btns">
      </section>
    </article>
  )
}
