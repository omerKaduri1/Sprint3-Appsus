import { NoteImg } from "./NoteImg.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function NotePreview({ note, removeNote, editNote, saveNote, changeBackgroundColor }) {

  {
    switch (note.type) {
      case "NoteTxt":
        return (
          <NoteTxt
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        )
      case "NoteImg":
        return (
          <NoteImg
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        )
      case "NoteVideo":
        return (
          <NoteVideo
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        )
      case "NoteTodos":
        return (
          <NoteTodos
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        )
    }
  }
}
