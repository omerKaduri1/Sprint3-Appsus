import { NoteImg } from "./NoteImg.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"

export function NotePreview({
  note,
  removeNote,
  editNote,
  saveNote,
  changeBackgroundColor,
  setNotes,
  setPinnedNotes,
}) {
  {
    switch (note.type) {
      case "NoteTxt":
        return (
          <NoteTxt
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
            setNotes={setNotes}
            setPinnedNotes={setPinnedNotes}
          />
        )
      case "NoteImg":
        return (
          <NoteImg
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
            setNotes={setNotes}
            setPinnedNotes={setPinnedNotes}
          />
        )
      case "NoteVideo":
        return (
          <NoteVideo
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
            setNotes={setNotes}
            setPinnedNotes={setPinnedNotes}
          />
        )
      case "NoteTodos":
        return (
          <NoteTodos
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            changeBackgroundColor={changeBackgroundColor}
            setNotes={setNotes}
            setPinnedNotes={setPinnedNotes}
          />
        )
    }
  }
}
