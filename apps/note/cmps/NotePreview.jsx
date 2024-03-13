export function NotePreview({ note, removeNote }) {

    function onRemoveNote(noteId) {
        removeNote(noteId)
    }
  return (
    <article className="note-preview" style={note.style}>
      <h2>{note.info.title}</h2>
      <p>{note.info.txt}</p>
      <section className="note-btns">
      <button className="remove-btn"
      onClick={()=>onRemoveNote(note.id)}>X</button>
      </section>
    </article>
  )
}
