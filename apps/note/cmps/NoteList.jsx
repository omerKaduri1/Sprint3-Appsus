import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes }) {
  if (!notes) return <div>Loading...</div>
  return (
    <section className="note-list-container">
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id}>
            <NotePreview note={note} />
          </li>
        ))}
      </ul>
    </section>
  )
}
