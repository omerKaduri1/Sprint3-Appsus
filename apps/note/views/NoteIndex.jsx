const { useState, useEffect } = React

import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { PinnedNotesList } from "../cmps/PinnedNotesList.jsx"
import { UserMsg } from "../../../cmps/UserMsg.jsx"

import { noteService } from "../services/note.service.js"
import {
  showSuccessMsg,
  showErrorMsg,
} from "../../../services/event-bus.service.js"

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
  const [pinnedNotes, setPinnedNotes] = useState(null)
  const [openPaletteNoteId, setOpenPaletteNoteId] = useState("")

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function onSetFilterBy(newTxt) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...newTxt }))
  }

  function loadNotes() {
    noteService.query(filterBy).then((notes) => {
      const pinned = notes.filter((note) => note.isPinned)
      setPinnedNotes(pinned)

      const unPinned = notes.filter((note) => !note.isPinned)
      setNotes(unPinned)
    })
  }

  function addNote(note) {
    noteService
      .save(note)
      .then((savedNote) => {
        setNotes((prevNotes) => [...prevNotes, savedNote])
        showSuccessMsg(`Note added successfully`)
      })
      .catch((err) => {
        showErrorMsg(`Could not add note`)
      })
  }

  function saveNote(note) {
    const noteId = note.id
    noteService
      .save(note)
      .then((savedNote) => {
        setNotes((prevNotes) => {
          const noteIdx = prevNotes.findIndex((note) => note.id === noteId)
          const updatedNotes = [...prevNotes]
          updatedNotes[noteIdx] = savedNote
          return updatedNotes
        })
        setPinnedNotes((prevPinnedNotes) => {
          const noteIdx = prevPinnedNotes.findIndex(
            (note) => note.id === noteId
          )
          if (noteIdx !== -1) {
            const updatedPinnedNotes = [...prevPinnedNotes]
            updatedPinnedNotes[noteIdx] = savedNote
            return updatedPinnedNotes
          }
          return prevPinnedNotes
        })
        showSuccessMsg(`Note updated successfully`)
      })
      .catch((err) => {
        showErrorMsg(`Could not update note`)
      })
  }

  function removeNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        setPinnedNotes((prevPinnedNotes) =>
          prevPinnedNotes.filter((note) => note.id !== noteId)
        )
        showSuccessMsg(`Note removed successfully`)
      })
      .catch((err) => {
        showErrorMsg(`Could not remove note`)
      })
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className="note-index">
        <section className="user-icons-container flex">
          <button>
            <i className="fa-solid fa-gear"></i>
          </button>
          <button>
            <i className="fa-solid fa-circle-info"></i>
          </button>
          <button>
            <i className="fa-regular fa-circle-user"></i>
          </button>
        </section>
      <section className="main-notes-container main-layout flex column align-center">
        <NoteFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
        <section className="add-note-container">
          <NoteAdd addNote={addNote} />
        </section>
        {pinnedNotes && (
          <PinnedNotesList
            notes={pinnedNotes}
            removeNote={removeNote}
            saveNote={saveNote}
            setNotes={setNotes}
            setPinnedNotes={setPinnedNotes}
            openPaletteNoteId={openPaletteNoteId}
            setOpenPaletteNoteId={setOpenPaletteNoteId}
          />
        )}
        <NoteList
          notes={notes}
          removeNote={removeNote}
          saveNote={saveNote}
          setNotes={setNotes}
          setPinnedNotes={setPinnedNotes}
          openPaletteNoteId={openPaletteNoteId}
          setOpenPaletteNoteId={setOpenPaletteNoteId}
        />
      </section>

      <UserMsg />
    </section>
  )
}
