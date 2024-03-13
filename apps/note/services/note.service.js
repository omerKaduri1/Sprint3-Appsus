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

// const notes = [
//   {
//     id: "n101",
//     createdAt: 1112222,
//     type: "NoteTxt",
//     isPinned: true,
//     style: {
//       backgroundColor: "#00d",
//     },
//     info: {
//       txt: "Fullstack Me Baby!",
//     },
//   },
//   {
//     id: "n102",
//     type: "NoteImg",
//     isPinned: false,
//     info: {
//       url: "http://some-img/me",
//       title: "Bobi and Me",
//     },
//     style: {
//       backgroundColor: "#00d",
//     },
//   },
//   {
//     id: "n103",
//     type: "NoteTodos",
//     isPinned: false,
//     info: {
//       title: "Get my stuff together",
//       todos: [
//         { txt: "Driving license", doneAt: null },
//         { txt: "Coding power", doneAt: 187111111 },
//       ],
//     },
//   },
// ]

function query(filterBy = getDefaultFilter()) {

  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, "i")
      notes = notes.filter((note) => regex.test(note.info.txt))
    }
    // if (filterBy.minSpeed) {
    //   notes = notes.filter((note) => note.maxSpeed >= filterBy.minSpeed)
    // }
    // if (filterBy.desc) {
    //   const regex = new RegExp(filterBy.desc, "i")
    //   notes = notes.filter((note) => regex.test(note.desc))
    // }
    return notes
  })
}

function get(noteId) {
  return storageService
    .get(NOTE_KEY, noteId)
    .then((note) => _setNextPrevNoteId(note))
  // return axios.get(note_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  console.log(note);
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote(txt = "") {
  return {
    type: "NoteTxt",
    isPinned: false,
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
    notes = []
    notes.push(_createNote("aaaa"))
    notes.push(_createNote("Coding Academy"))
    notes.push(_createNote("I love javaScript"))
  }
  utilService.saveToStorage(NOTE_KEY, notes)
}

function _createNote(txt) {
  const note = getEmptyNote(txt)
  note.id = utilService.makeId()
  note.createdAt = 0
  return note
}