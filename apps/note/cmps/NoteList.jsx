import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, removeNote }) {
  return (
    <section className="note-list-container">
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id}>
            <NotePreview note={note} 
            removeNote={removeNote} />
          </li>
        ))}
      </ul>
    </section>
  )
}
