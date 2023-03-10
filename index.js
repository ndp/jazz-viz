import { Vex } from 'vexflow'
import {
  chordParserFactory,
} from 'chord-symbol'

const parseChord = chordParserFactory()

console.log('VexFlow Build:', Vex.Flow.BUILD)

const { Factory, Stave, StaveNote, Formatter, Renderer } = Vex.Flow

Vex.Flow.setMusicFont("Bravura")
Vex.Flow.setMusicFont('Petaluma');
// Create an SVG renderer and attach it to the DIV element named "boo".
const div = document.getElementById('output')
const renderer = new Renderer(div, Renderer.Backends.SVG)

// Configure the rendering context.
renderer.resize(1000, 200)
const context = renderer.getContext()

const stave = new Stave(10, 10, 1000)
stave.addClef('treble').addTimeSignature('4/4')

stave.setContext(context).draw()


let lastNotes = new Set()
let allNotes = new Set()
const notes = ['Am7', 'D7', 'G7', 'Cmaj7', 'F#min7', 'B7', 'Em', 'Em'].map((ch, i) => {
  const chord = parseChord(ch)
  const notes = chord.normalized.notes
  const keys = notes.map(n => `${n.toLowerCase()}/4`)
  console.log(keys)
  let staveNote = new StaveNote({ keys: keys, duration: 'w' })

  notes.forEach((n, j) => {
    if (!allNotes.has(n))
      staveNote.setKeyStyle(j, { fillStyle: 'red', strokeStyle: 'red' })
    if (lastNotes.has(n))
      staveNote.setKeyStyle(j, { fillStyle: 'grey', strokeStyle: 'grey' })
    allNotes.add(n)
  })

  lastNotes = new Set(notes)
  return staveNote

})
// -> CM7

// const notes = [
//   new StaveNote({ keys: ["g/4", "b/4", "cb/5", "e/5", "g#/5", "b/5"], duration: "h" }),
//   new StaveNote({ keys: ["c/4"], duration: "h", color: 'red' }),
// ];
// notes[0].setKeyStyle(1, { fillStyle: 'blue', strokeStyle: 'blue' })
// notes[0].setKeyStyle(2, { fillStyle: 'brown', strokeStyle: 'blue' })
// notes[0].setKeyStyle(3, { fillStyle: 'red', strokeStyle: 'blue' })

Formatter.FormatAndDraw(context, stave, notes)


// const staffFactory = new Factory({
//                                    renderer: {
//                                      elementId: 'staff', width: 100, height: 200,
//                                    },
//                                  })
// staffFactory
//   .System()
//   .addStave({ voices: [] })
//   .addClef('treble')
//   .addTimeSignature('4/4')
// staffFactory.draw()
// const m1b1Factory = new Factory({
//                                   renderer: {
//                                     elementId: 'm1b1', width: 500, height: 100,
//                                   },
//                                 })
//
//
// const factory = new Factory({
//                               renderer: { elementId: 'm1b1', width: 200, height: 100 },
//                             })
// const score = factory.EasyScore()
//
//
// factory
//   .System()
//   .addStave({
//               voices: [
//                 score.voice(score.notes('C#5/w', { stem: 'up' })),
//                 score.voice(score.notes('C#4/h, C#4', { stem: 'down' })),
//                 score.voice(score.notes('A4/h, G#4', { stem: 'down' })),
//                 score.voice(score.notes('E4/h, E4', { stem: 'down' })),
//               ],
//             })
// factory.draw();


