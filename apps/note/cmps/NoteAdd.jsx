const { useState } = React

import { NoteAddType } from "./NoteAddType.jsx"
import { noteService } from "../services/note.service.js"

export function NoteAdd({ addNote }) {
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

  function onSetNoteType(type) {
    setNoteType(type)
  }

  return (
    <section className="add-note">
      {noteType && (
        <React.Fragment>
          <NoteAddType addNote={addNote} type={noteType} />
          <section className="note-type-btns">
            {typeBtns.map((btn, idx) => (
              <button
              title={`add ${btn.type}`}
                key={idx}
                type="button"
                onClick={() => onSetNoteType(btn.type)}
              >
                {btn.icon}
              </button>
            ))}
          </section>
        </React.Fragment>
      )}
    </section>
  )
}
