const { useState } = React

import { NotePreviewButtons } from "./NotePreviewButtons.jsx"

export function NoteImg({ note, removeNote, editNote, changeBackgroundColor }) {
  const [noteBgColor, setNoteBgColor] = useState(note.style)

  return (
    <article className="note-preview" style={noteBgColor}>
      <h2>{note.info.title}</h2>
      <img src={note.info.imgUrl} alt={note.info.title} />
      <section className="note-btns">
        <NotePreviewButtons
          note={note}
          removeNote={removeNote}
          editNote={editNote}
          changeBackgroundColor={changeBackgroundColor}
        />
      </section>
    </article>
  )
}
