import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, removeNote, editNote }) {
  return (
    <section className="note-list-container">
      <ul className="note-list clean-list">
        {notes.map((note) => (
          <li key={note.id}>
            <NotePreview
              note={note}
              removeNote={removeNote}
              editNote={editNote}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
