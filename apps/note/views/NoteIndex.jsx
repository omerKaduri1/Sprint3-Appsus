const { useState, useEffect } = React

import { NoteList } from "../cmps/NoteList.jsx"

import { noteService } from "../services/note.service.js"

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  // const [filterBy, setFilterBy] = useState()

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService.query().then((notes) => {
      setNotes(notes)
    })
  }

  function removeNote(noteId) {
    noteService.remove(noteId)
    .then(() => {
        setNotes((prevNotes) => prevNotes.filter(note=> note.id!== noteId))
    })
    .catch((err) => {
        console.log(`Could not remove ${noteId}`);
    })
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className="note-index">
        <section className="main-notes-container">
            <NoteList
            notes={notes}
            removeNote={removeNote}/>
        </section>
    </section>
  )
}
