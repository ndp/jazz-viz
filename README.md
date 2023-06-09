When I'm soloing I want to know what the "new" notes are as 
the chords change: notes that the listener hasn't heard lately
or at all (in this song). That's the idea. I may explore other
ideas once I have the basic mechanics working.

I was inspired by [Bob Keller's "How to Key-Map a Tune"](https://www.cs.hmc.edu/courses/common/mus84/KeyMaps.pdf), which brings Excel spreadsheets into the jazz (why not?). This approach is a much
more conventional jazz theory (and probably better) approach. If
you are learning jazz theory, start there.

## Example

In this one, we see "new" notes in green, and repeated 
notes in gray:

<img src='./autumn-leaves-1-8.png' />

I see this as a tool for analysis, not any sort of real-time usage.

For me, this is more interesting on a song that confounds me a bit, like Dolphin Dance. I still haven't quite figured out how to bring coherence to the chords:

<img src='./dolphin-dance-1-16.png' />


## Future

Right now, you enter chords yourself. I went this route 
hunting around for existing libraries and not finding anything 
that would work well. I can imagine a way to paste in a whole tune.

I wonder if doing a gradient of how popular a note is might be interesting.



## Credits

- uses a library called [vexflow](https://github.com/0xfe/vexflow/) for rendering the notes and staves.
- uses a library called `chord-symbol` to translate chord symbols
  to notes.
