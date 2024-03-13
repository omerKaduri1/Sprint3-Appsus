import {NoteTxtAdd} from './NoteTxtAdd.jsx'
import {NoteImgAdd} from './NoteImgAdd.jsx'
import {NoteVideoAdd} from './NoteVideoAdd.jsx'
import {NoteTodoAdd} from './NoteTodoAdd.jsx'

export function NoteAddType({ addNote, type }) {
  switch (type) {
    case "NoteTxt":
      return <NoteTxtAdd addNote={addNote} type={type} />
    case "NoteImg":
      return <NoteImgAdd addNote={addNote} type={type} />
    case "NoteVideo":
      return <NoteVideoAdd addNote={addNote} type={type} />
    case "NoteTodos":
      return <NoteTodoAdd addNote={addNote} type={type} />
  }
}
