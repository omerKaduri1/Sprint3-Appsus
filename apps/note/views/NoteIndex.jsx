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

//   if (!notes) return <div>Loading...</div>
  return (
    <section className="note-index">
        <section className="main-notes-container">
            <NoteList
            notes={notes}/>
        </section>
    </section>
  )
}
