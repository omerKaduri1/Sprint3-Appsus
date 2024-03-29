import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTE_KEY = "noteDB"
export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter,
}
window.nt = noteService

_createNotes()

function query(filterBy = getDefaultFilter()) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, "i")
      notes = notes.filter((note) => {
        const textMatch = regex.test(note.info.txt)
        const titleMatch = regex.test(note.info.title)

        if (note.type === "NoteTodos") {
          const todoMatch = note.info.todos.some((todo) => regex.test(todo.txt))
          const titleMatch = regex.test(note.info.title)
          return todoMatch || titleMatch
        }

        return textMatch || titleMatch
      })
    }
    return notes
  })
}

function get(noteId) {
  return storageService
    .get(NOTE_KEY, noteId)
    .then((note) => _setNextPrevNoteId(note))
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote(
  type = "NoteTxt",
  isPinned = false,
  createdAt = Date.now(),
  txt = ""
) {
  return {
    type,
    isPinned,
    createdAt,
    style: { backgroundColor: "fff" },
    info: { txt },
  }
}

function getDefaultFilter() {
  return { txt: "" }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: "n101",
        createdAt: 1112222,
        type: "NoteTxt",
        isPinned: true,
        style: {
          backgroundColor: "#f39f76",
        },
        info: {
          txt: "Fullstack Me Baby!",
        },
      },
      {
        id: "n102",
        type: "NoteImg",
        isPinned: true,
        info: {
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Lionel_Messi_WC2022.jpg/220px-Lionel_Messi_WC2022.jpg",
          title: "",
        },
        style: {
          backgroundColor: "#aeccdc",
        },
      },
      {
        id: "n103",
        type: "NoteVideo",
        isPinned: true,
        info: {
          title: "",
          youtubeUrl: "https://www.youtube.com/watch?v=nFjDqwtXdKw",
        },
        style: {
          backgroundColor: "#d3bfdb",
        },
      },
      {
        id: "n104",
        type: "NoteTodos",
        isPinned: false,
        info: {
          title: "Things to do",
          todos: [
            {
              txt: "Grocery shopping",
              doneAt: 134334564,
              id: utilService.makeId(),
            },
            {
              txt: "Workout",
              doneAt: null,
              id: utilService.makeId(),
            },
            {
              txt: "Coding",
              doneAt: null,
              id: utilService.makeId(),
            },
          ],
        },
        style: {
          backgroundColor: "#efeff1",
        },
      },
      {
        id: "n105",
        type: "NoteImg",
        isPinned: false,
        info: {
          imgUrl:
            "https://i.pinimg.com/564x/fe/04/ec/fe04ecdaed193eeb0c3bb317c01c1c52.jpg",
          title: "",
        },
        style: {
          backgroundColor: "#fff",
        },
      },
      {
        id: "n106",
        type: "NoteImg",
        isPinned: true,
        info: {
          imgUrl:
            "https://i.pinimg.com/564x/9a/67/11/9a6711f44756b6fe23a7309463afb1bd.jpg",
          title: "",
        },
        style: {
          backgroundColor: "#b4ddd3",
        },
      },
      {
        id: "n107",
        type: "NoteTodos",
        isPinned: true,
        info: {
          title: "Groceries",
          todos: [
            { txt: "Apples", doneAt: 134334564, id: utilService.makeId() },
            {
              txt: "Oranges",
              doneAt: 134334564987,
              id: utilService.makeId(),
            },
            {
              txt: "Milk",
              doneAt: null,
              id: utilService.makeId(),
            },
            {
              txt: "Cereal",
              doneAt: null,
              id: utilService.makeId(),
            },
            {
              txt: "Bread",
              doneAt: null,
              id: utilService.makeId(),
            },
          ],
        },
        style: {
          backgroundColor: "#efeff1",
        },
      },
      {
        id: "n108",
        type: "NoteImg",
        isPinned: true,
        info: {
          imgUrl:
            "https://cdn.britannica.com/01/235601-050-895651AA/Friends-cast-television-series-1994.jpg",
          title: "",
        },
        style: {
          backgroundColor: "#efeff1",
        },
      },
      {
        id: "n109",
        type: "NoteImg",
        isPinned: false,
        info: {
          imgUrl:
            "https://i.pinimg.com/564x/cb/96/c1/cb96c16f1ec3bcd98b6ddf0748dddd6b.jpg",
          title: "",
        },
        style: {
          backgroundColor: "#aeccdc",
        },
      },
      {
        id: "n110",
        type: "NoteVideo",
        isPinned: false,
        info: {
          youtubeUrl:
            "https://www.youtube.com/watch?v=uYJQIKAVBw8",
          title: "",
        },
        style: {
          backgroundColor: "#efeff1",
        },
      },
      {
        id: "n111",
        type: "NoteImg",
        isPinned: false,
        info: {
          imgUrl:
            "https://i.pinimg.com/564x/8d/a4/3d/8da43dde29c98af372c0a2c93307e4a4.jpg",
          title: "",
        },
        style: {
          backgroundColor: "#efeff1",
        },
      },
    ]
  }
  utilService.saveToStorage(NOTE_KEY, notes)
}

function _createNote(txt) {
  const note = getEmptyNote(txt)
  note.id = utilService.makeId()
  return note
}
