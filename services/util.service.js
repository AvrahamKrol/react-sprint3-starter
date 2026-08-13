export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getRandomColor,
  padNum,
  getDayName,
  getMonthName,
  loadFromStorage,
  saveToStorage,
  formatDate,
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  const val = localStorage.getItem(key)
  return JSON.parse(val)
}

function makeId(length = 6) {
  var txt = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function padNum(num) {
  return num > 9 ? num + '' : '0' + num
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  var color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getDayName(date, locale) {
  date = new Date(date)
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthNames[date.getMonth()]
}

function formatDate(timestamp) {
  const date = new Date(timestamp)
  const today = new Date()

  // Strip time, compare just the calendar day
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  )
  console.log('dateOnly:', dateOnly)
  console.log('todayOnly:', todayOnly)

  const diffDays = Math.round((dateOnly - todayOnly) / (1000 * 60 * 60 * 24))
  console.log('diffDays:', diffDays)

  let formatedDate = ''
  const formatedTime = date.toLocaleTimeString('us-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  switch (diffDays) {
    case 0:
      formatedDate += ' '
      break
    case -1:
      formatedDate += 'Yesterday '
      break
    case 1:
      formatedDate += 'Tomorrow '
      break
    default:
      formatedDate += date.toLocaleDateString()
  }

  return 'Changed ' + formatedDate + formatedTime
}
