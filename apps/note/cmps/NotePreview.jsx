export function NotePreview({ note, removeNote, editNote }) {
  function onRemoveNote(noteId) {
    removeNote(noteId)
  }
  return (
    <article
      onClick={() => {
        editNote(note)
      }}
      className="note-preview"
      style={note.style}
    >
      <h2>{note.info.title}</h2>
      <p>{note.info.txt}</p>
      <section className="note-btns">
        <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>
          X
        </button>
      </section>
    </article>
  )
}
