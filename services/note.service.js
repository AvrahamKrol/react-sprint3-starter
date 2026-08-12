import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
}

const NOTE_KEY = 'noteDB'

const mock_notes = [
  // {
  //   id: 'n101',
  //   createdAt: 1786551000000,
  //   type: 'NoteTxt',
  //   isPinned: true,
  //   style: {
  //     backgroundColor: '#00d',
  //   },
  //   info: {
  //     txt: 'Fullstack Me Baby!',
  //   },
  // },
  // {
  //   id: 'n102',
  //   createdAt: 1786438260000,
  //   type: 'NoteImg',
  //   isPinned: false,
  //   style: {
  //     backgroundColor: '#0d0',
  //   },
  //   info: {
  //     url: 'http://some-img/me',
  //     title: 'Bobi and Me',
  //   },
  // },
  // {
  //   id: 'n103',
  //   createdAt: 1754930940000,
  //   type: 'NoteTodos',
  //   isPinned: false,
  //   style: {
  //     backgroundColor: '#d00',
  //   },
  //   info: {
  //     title: 'Get my stuff together',
  //     todos: [
  //       { txt: 'Driving license', isDone: true },
  //       { txt: 'Coding power', isDone: false },
  //     ],
  //   },
  // },
]

_createNotes()

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId).then((note) => note)
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

function getEmptyNote() {
  return {
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: false,
    style: { backgroundColor: 'fff' },
    info: { txt: utilService.makeLorem(7) },
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    if (mock_notes && mock_notes.length > 0) {
      notes = mock_notes
    } else {
      notes = []
      for (var i = 0; i < 5; i++) {
        const note = _createNote()
        notes.push(note)
      }
    }
  }
  utilService.saveToStorage(NOTE_KEY, notes)
}

function _createNote() {
  return {
    id: utilService.makeId(),
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: false,
    style: { backgroundColor: 'fff' },
    info: { txt: utilService.makeLorem(7) },
  }
}
