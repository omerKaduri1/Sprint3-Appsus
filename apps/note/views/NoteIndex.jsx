const { useState, useEffect } = React

import { NoteAdd } from "../cmps/NoteAdd.jsx"
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

  function addNote(note) {
    noteService.save(note)
    .then((savedNote) => setNotes((prevNotes) => [...prevNotes, savedNote]))
    .catch((err) => {
        console.log('Could not add note');
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
            <section className='add-note-container'>
                <NoteAdd addNote={addNote}/>
            </section>
            <NoteList
            notes={notes}
            removeNote={removeNote}/>
        </section>
    </section>
  )
}
