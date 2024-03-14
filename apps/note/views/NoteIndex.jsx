const { useState, useEffect } = React

import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteList } from "../cmps/NoteList.jsx"

import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function onSetFilterBy(newTxt) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...newTxt }))
  }

  function loadNotes() {
    noteService.query(filterBy).then((notes) => {
      setNotes(notes)
    })
  }

  function addNote(note) {
    noteService
      .save(note)
      .then((savedNote) => setNotes((prevNotes) => [...prevNotes, savedNote]))
      .catch((err) => {
        console.log("Could not add note")
      })
  }

  function saveNote(note) {
    const noteId = note.id
    noteService.save(note).then((savedNote) => {
      const noteIdx = notes.findIndex((note) => note.id === noteId)
      notes.splice(noteIdx, 1, savedNote)
      setNotes([...notes])
    })
  }
  
  function removeNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
      })
      .catch((err) => {
        console.log(`Could not remove ${noteId}`)
      })
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className="note-index">
      <section className="main-notes-container flex column align-center">
        <NoteFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
        <section className="add-note-container">
          <NoteAdd addNote={addNote} />
        </section>
        <NoteList
          notes={notes}
          removeNote={removeNote}
          saveNote={saveNote}
        />
      </section>
    </section>
  )
}
