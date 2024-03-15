const { useState, useEffect } = React

import { NoteTxtEdit } from "./NoteTxtEdit.jsx"
import { NoteImgEdit } from "./NoteImgEdit.jsx"
import { NoteVideoEdit } from "./NoteVideoEdit.jsx"
import { NoteTodosEdit } from "./NoteTodosEdit.jsx"

import { noteService } from "../services/note.service.js"

export function NoteEdit({ note, saveNote, onSetEdit }) {
  switch (note.type) {
    case "NoteTxt":
      return (
        <NoteTxtEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )
    case "NoteImg":
      return (
        <NoteImgEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )
    case "NoteVideo":
      return (
        <NoteVideoEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )
    case "NoteTodos":
      return (
        <NoteTodosEdit note={note} saveNote={saveNote} onSetEdit={onSetEdit} />
      )
  }
}
