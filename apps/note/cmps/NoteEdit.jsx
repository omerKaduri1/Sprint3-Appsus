const { useState, useEffect } = React

import { NoteTxtEdit } from "./NoteTxtEdit.jsx"
import { NoteImgEdit } from "./NoteImgEdit.jsx"

import { noteService } from "../services/note.service.js"

export function NoteEdit({ note, saveNote, onSetEdit }) {
  // const [editedInfo, setEditedInfo] = useState(note.info)

  switch (note.type) {
    case "NoteTxt":
      return (
        <NoteTxtEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )
    case "NoteImg":
      return (
        <NoteImgEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )
    case "NoteVideo":
      return (
        <NoteVideoEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )
    case "NoteTodos":
      return (
        <NoteTodoEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )
  }

  // function saveNote(note) {
  //   noteService.save(note).then((savedNote) => {

  //   })
  // }

  function onEdit(ev) {
    ev.preventDefault()
    note.info = editedInfo
    saveNote(note)
  }

  function handleChange({ target }) {
    const { value } = target
    console.log(value)
    setEditedInfo(value)
  }

  // return (
  //   <section className="edit-container">
  //     <form className="note-edit" onSubmit={onEdit}>
  //       {/* <input
  //         className="title-input"
  //         required
  //         onChange={handleChange}
  //         type="text"
  //         name="title"
  //         id="title"
  //         placeholder="Title"
  //         value={editedInfo.title}
  //       /> */}

  //       <input
  //         className="txt-input"
  //         onChange={handleChange}
  //         name="txt"
  //         id="txt"
  //         value={editedInfo.txt}
  //         cols="30"
  //         rows="10"
  //         placeholder="Enter your note..."
  //       />
  //       <div className="actions-container">
  //         <button type="submit">Save</button>
  //       </div>
  //     </form>
  //   </section>
  // )
}
