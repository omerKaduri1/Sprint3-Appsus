import { NoteImg } from "./NoteImg.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"

export function NotePreview({
  note,
  removeNote,
  saveNote,
  setNotes,
  setPinnedNotes,
  openPaletteNoteId,
  setOpenPaletteNoteId
}) {
  {
    switch (note.type) {
      case "NoteTxt":
        return (
          <NoteTxt
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            setNotes={setNotes}
            setPinnedNotes={setPinnedNotes}
            openPaletteNoteId={openPaletteNoteId}
            setOpenPaletteNoteId={setOpenPaletteNoteId}
          />
        )
      case "NoteImg":
        return (
          <NoteImg
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            setNotes={setNotes}
            setPinnedNotes={setPinnedNotes}
            openPaletteNoteId={openPaletteNoteId}
            setOpenPaletteNoteId={setOpenPaletteNoteId}
          />
        )
      case "NoteVideo":
        return (
          <NoteVideo
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            setNotes={setNotes}
            setPinnedNotes={setPinnedNotes}
            openPaletteNoteId={openPaletteNoteId}
            setOpenPaletteNoteId={setOpenPaletteNoteId}
          />
        )
      case "NoteTodos":
        return (
          <NoteTodos
            note={note}
            removeNote={removeNote}
            saveNote={saveNote}
            setNotes={setNotes}
            setPinnedNotes={setPinnedNotes}
            openPaletteNoteId={openPaletteNoteId}
            setOpenPaletteNoteId={setOpenPaletteNoteId}
          />
        )
    }
  }
}
