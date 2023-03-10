import {
  Vex,
  Accidental,
  Voice,
} from 'vexflow'
import {
  chordParserFactory,
} from 'chord-symbol'

const parseChord = chordParserFactory()

console.log('VexFlow Build:', Vex.Flow.BUILD)

const { Factory, Stave, StaveNote, Formatter, Renderer } = Vex.Flow

Vex.Flow.setMusicFont('Bravura')
// Vex.Flow.setMusicFont('Petaluma');
// Create an SVG renderer and attach it to the DIV element named "boo".
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

function renderChords (chords) {

// Configure the rendering context.
  renderer.resize(1000, 200)
  const context = renderer.getContext()
  context.clear()

  const stave = new Stave(10, 10, 1000)
  stave.addClef('treble').addTimeSignature('4/4')

  stave.setContext(context).draw()

  let lastNotes = new Set()
  let allNotes = new Set()
  const notes = chords.map((ch, i) => {
    const chord = parseChord(ch)
    const notes = chord.normalized.notes
    console.log(chord.normalized)
    let octave = 4
    const keys = notes.map((n, j) => {
      if (['C', 'C#', 'Db', 'D', 'D#'].includes(n) && j > 0) octave = 5
      return `${n.toLowerCase()}/${octave}`
    })
    let staveNote = new StaveNote({ keys: keys, duration: 'w' })

    notes.forEach((n, j) => {
      if (!allNotes.has(n) && i !== 0)
        staveNote.setKeyStyle(j, { fillStyle: 'red', strokeStyle: 'red' })
      if (lastNotes.has(n))
        staveNote.setKeyStyle(j, { fillStyle: 'grey', strokeStyle: 'grey' })
      allNotes.add(n)
    })

    lastNotes = new Set(notes)
    return staveNote

  })

  const voice = new Voice().setMode(Voice.Mode.SOFT).addTickables(notes)
  Accidental.applyAccidentals([voice], 'C')

  Formatter.FormatAndDraw(context, stave, notes)

}

