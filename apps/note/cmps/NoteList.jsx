import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, removeNote, editNote, saveNote }) {
  return (
    <section className="note-list-container flex">
      <ul className="note-list clean-list">
        <section className="inner-container">
        {notes.map((note) => (
          <li key={note.id}>
            <NotePreview
              note={note}
              removeNote={removeNote}
              // editNote={editNote}
              saveNote={saveNote}
              />
          </li>
        ))}
        </section>
      </ul>
    </section>
  )
}
