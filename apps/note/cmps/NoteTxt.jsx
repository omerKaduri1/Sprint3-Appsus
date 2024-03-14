const { useState } = React

import { NotePreviewButtons } from "./NotePreviewButtons.jsx"

export function NoteTxt({ note, removeNote, editNote, changeBackgroundColor }) {
  const [noteBgColor, setNoteBgColor] = useState(note.style)

  return (
    <article
      // onClick={() => {
      //   editNote(note)
      // }}
      className="note-preview"
      style={noteBgColor}
    >
      {/* <h2>{note.info.title}</h2> */}
      <p>{note.info.txt}</p>
      <section className="note-btns">
        <NotePreviewButtons
          note={note}
          removeNote={removeNote}
          editNote={editNote}
          changeBackgroundColor={changeBackgroundColor}
        />
        {/* <ColorButtons
        note={note}
        changeBackgroundColor={changeBackgroundColor}
      /> */}
        {/* <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>
        X
      </button> */}
      </section>
    </article>
  )
}
