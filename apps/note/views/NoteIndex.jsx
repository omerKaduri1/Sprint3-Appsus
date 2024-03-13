const { useState, useEffect } = React

import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"

import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function onSetFilterBy(newTxt) {
    setFilterBy((prevFilter) => ({...prevFilter, ...newTxt}))
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

  function editNote(note) {
    setSelectedNote(note)
  }

  function saveNote(note) {
    noteService.save(note).then((savedNote) => {
      setSelectedNote(null)
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

//   function changeBackgroundColor(note, color) {
//     const style = { backgroundColor: color }
//     note = { ...note, style }
//     noteService.save(note)
//   }

  if (!notes) return <div>Loading...</div>
  return (
    <section className="note-index flex align-center justify-center">
      <section className="main-notes-container">
        <NoteFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
        <section className="add-note-container">
          <NoteAdd addNote={addNote} />
        </section>
        <NoteList
          notes={notes}
          removeNote={removeNote}
          editNote={editNote}
        //   changeBackgroundColor={changeBackgroundColor}
        />
      </section>

      {selectedNote && <NoteEdit note={selectedNote} saveNote={saveNote} />}
    </section>
  )
}
