const { useState } = React

import { NoteImg } from "./NoteImg.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

import { noteService } from "../services/note.service.js"

export function NotePreview({ note, removeNote, editNote, saveNote }) {
  const [noteBgColor, setNoteBgColor] = useState(note.style)

  function changeBackgroundColor(note, color) {
    const style = { backgroundColor: color }
    note = { ...note, style }
    noteService.save(note)
    setNoteBgColor({ backgroundColor: color })
  }

  {
    switch (note.type) {
      case "NoteTxt":
        return (
          <NoteTxt
            note={note}
            removeNote={removeNote}
            // editNote={editNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        )
      case "NoteImg":
        return (
          <NoteImg
            note={note}
            removeNote={removeNote}
            editNote={editNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        )
      case "NoteVideo":
        return (
          <NoteVideo
            note={note}
            removeNote={removeNote}
            editNote={editNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        )
      case "NoteTodos":
        return (
          <NoteTodos
            note={note}
            removeNote={removeNote}
            editNote={editNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        )
    }
  }
}
