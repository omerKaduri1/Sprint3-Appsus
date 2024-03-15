import { NotePreview } from "./NotePreview.jsx"

export function PinnedNotesList({
  notes,
  removeNote,
  saveNote,
  setNotes,
  setPinnedNotes,
}) {
  if (!notes.length)
    return (
      <div className="no-match">
        <h3>Pinned Notes:</h3>
        There are no pinned notes.
      </div>
    )
  return (
    <section className="pinned-notes">
      <h3>Pinned Notes:</h3>
      <ul className="note-list clean-list">
        <section className="inner-container">
          {notes.map((note) => (
            <li key={note.id}>
              <NotePreview
                note={note}
                removeNote={removeNote}
                saveNote={saveNote}
                setNotes={setNotes}
                setPinnedNotes={setPinnedNotes}
              />
            </li>
          ))}
        </section>
      </ul>
    </section>
  )
}
