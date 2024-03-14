const { useState } = React

import { NotePreviewButtons } from "./NotePreviewButtons.jsx"
import { NoteEdit } from "./NoteEdit.jsx"

export function NoteTxt({
  note,
  removeNote,
  changeBackgroundColor,
  saveNote,
}) {
  const [noteBgColor, setNoteBgColor] = useState(note.style)
  const [isOnEdit, setIsOnEdit] = useState(false)
  const [isNotePinned, setIsNotePinned] = useState(note.isPinned)

  function onSetEdit() {
    setIsOnEdit((prevIsOnEdit) => {
      return !prevIsOnEdit
    })
  }

  return (
    <article
      className="note-preview"
      style={noteBgColor}
    >
      <p>{note.info.txt}</p>
      <section className="note-btns">
        <NotePreviewButtons
          note={note}
          removeNote={removeNote}
          changeBackgroundColor={changeBackgroundColor}
          onSetEdit={onSetEdit}
          setIsNotePinned={setIsNotePinned}
        />
      </section>

      {isOnEdit && (
        <NoteEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )}
    </article>
  )
}
