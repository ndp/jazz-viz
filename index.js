import { Accidental, Vex } from 'vexflow'
import { chordParserFactory } from 'chord-symbol'

const WIDTH = 1000
const parseChord = chordParserFactory()

console.log('VexFlow Build:', Vex.Flow.BUILD)

const { Stave, StaveNote, Formatter, Renderer, BarNote } = Vex.Flow

Vex.Flow.setMusicFont('Bravura')
// Vex.Flow.setMusicFont('Petaluma')
const div = document.getElementById('output')
const renderer = new Renderer(div, Renderer.Backends.SVG)

watchInputs()
refresh()

function refresh () {
  const chords = readInputsAsChords()
  renderChords(chords)
}

function readInputsAsChords () {
  const inputs = document.getElementsByTagName('input')
  const chords = []
  for (let input of inputs) {
    chords.push(input.value)
  }
  return chords
}

function watchInputs () {
  const inputs = document.getElementsByTagName('input')
  for (let input of inputs) {
    input.addEventListener('change', () => {
      refresh()
    })
  }
}

function notesToKeys (notes) {
  let octave = 4
  return notes.map((n, j) => {
    if (['C', 'C#', 'Db', 'D', 'D#'].includes(n) && j > 0) octave = 5
    return `${n.toLowerCase()}/${octave}`
  })
}

function canonicalNote (note) {
  switch (note) {
    case 'A#':
      return 'Bb'
    case 'C#':
      return 'Db'
    case 'D#':
      return 'Eb'
    case 'F#':
      return 'Gb'
    case 'G#':
      return 'Ab'
    default:
      return note
  }
}

function renderChords (chords) {

  renderer.resize(WIDTH, 200)
  const context = renderer.getContext()
  context.clear()

  const stave = new Stave(10, 10, WIDTH)
  stave.addClef('treble')
  stave.addTimeSignature('4/4')
  stave.setContext(context).draw()

  let lastNotes = new Set()
  let allNotes = new Set()
  const notes = chords.flatMap((ch, i) => {
    const chord = parseChord(ch)
    const notes = chord.normalized?.notes || []
    const keys = notesToKeys(notes)

    let staveNote = keys.length === 0
                    ? new StaveNote({ keys: ['b/4'], stem_direction: 1, duration: 'wr' })
                    : new StaveNote({ keys: keys, duration: 'w' })

    // Add accidentals
    notes.forEach((n, j) => {
      const acc = keys[j].split('/')[0][1]
      if (!acc) return
      const accidental = new Accidental(acc)
      staveNote.addModifier(accidental, j)
    })

    // Colorize notes, based on usage
    notes.forEach((n, j) => {
      n = canonicalNote(n)
      if (!allNotes.has(n) && i !== 0)
        staveNote.setKeyStyle(j, { fillStyle: 'green', strokeStyle: 'green' })
      if (lastNotes.has(n))
        staveNote.setKeyStyle(j, { fillStyle: 'grey', strokeStyle: 'grey' })
      allNotes.add(n)
    })

    lastNotes = new Set(notes)
    if (i === chords.length -1)
      return [staveNote]
    return [staveNote, new BarNote()]
  })

  Formatter.FormatAndDraw(context, stave, notes)
}

