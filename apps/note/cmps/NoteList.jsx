import { NotePreview } from "./NotePreview.jsx"

export function NoteList({
  notes,
  removeNote,
  saveNote,
  setNotes,
  setPinnedNotes,
}) {
  if (!notes.length)
    return <div className="no-match">There are no matching results.</div>

  return (
    <section className="note-list-container flex">
      <ul className="note-list clean-list">
        <h3>Other Notes:</h3>
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
