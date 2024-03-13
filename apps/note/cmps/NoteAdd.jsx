const { useState } = React

import {NoteAddType} from './NoteAddType.jsx'
import { noteService } from "../services/note.service.js"

export function NoteAdd({ addNote }) {
  // const [noteInfo, setNoteInfo] = useState({ txt: "" })
  const [noteType, setNoteType] = useState("NoteTxt")

  const typeBtns = [
    {
      type: "NoteTxt",
      placeholder: "Add note...",
      icon: <i className="fa-regular fa-message"></i>,
    },
    {
      type: "NoteImg",
      titplaceholderle: "Add Image url...",
      icon: <i className="fa-regular fa-image"></i>,
    },
    {
      type: "NoteVideo",
      placeholder: "Add Video url...",
      icon: <i className="fa-brands fa-youtube"></i>,
    },
    {
      type: "NoteTodos",
      placeholder: "Add Todos...",
      icon: <i className="fa-solid fa-list"></i>,
    },
  ]

  // function onAddNote(ev) {
  //   ev.preventDefault()
  //   const emptyNote = noteService.getEmptyNote()
  //   const noteToAdd = { ...emptyNote, info: { ...emptyNote.info, ...noteInfo } }
  //   addNote(noteToAdd)
  // }

  // function handleChange({ target }) {
  //   const { name: field, value } = target
  //   setNoteInfo((prevNoteInfo) => ({ ...prevNoteInfo, [field]: value }))
  //   console.log("noteInfo:", noteInfo)
  // }

  function onSetNoteType(type) {
    setNoteType(type)
  }

  function dynPlaceholder() {
    if (noteType === "NoteTxt") return "Add note..."
    else if (noteType === "NoteImg") return "Add Image url..."
    else if (noteType === "NoteVideo") return "Add Video url..."
    else if (noteType === "NoteTodos") return "Add Todos..."
  }
  return (
    <section className="add-note">
      {/* <article> */}
      {/* <form className="add-text flex column" onSubmit={onAddNote}> */}
        {/* <input
            className="title-input"
            required
            placeholder="Title"
            onChange={handleChange}
            value={noteInfo.title}
            name="title"
            id="title"
            type="text"
          /> */}

        {/* <input
          type="text"
          className="txt-input"
          name="txt"
          id="txt"
          placeholder={dynPlaceholder()}
          onChange={handleChange}
          value={noteInfo.txt}
        /> */}

        <section className="note-type-btns">
          {typeBtns.map((btn, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSetNoteType(btn.type)}
            >
              {btn.icon}
            </button>
          ))}
        </section>

        {noteType && (
          <div>
            <NoteAddType addNote={addNote} type={noteType} />
          </div>
        )}
        {/* <button className="add-note-btn" type="submit">
          +
        </button> */}
      {/* </form> */}
      {/* </article> */}
    </section>
  )
}
