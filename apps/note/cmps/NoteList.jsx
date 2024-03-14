import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, removeNote, saveNote }) {
  return (
    <section className="note-list-container flex">
      <ul className="note-list clean-list">
        <section className="inner-container">
          {notes.map((note) => (
            <li key={note.id}>
              <NotePreview
                note={note}
                removeNote={removeNote}
                saveNote={saveNote}
              />
            </li>
          ))}
        </section>
      </ul>
    </section>
  )
}
