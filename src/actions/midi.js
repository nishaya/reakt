import {
  MIDI_NOTE_ON,
  MIDI_NOTE_OFF,
} from './action_types'

export default {
  noteOn: (note, velocity) => (
    {
      type: MIDI_NOTE_ON,
      payload: {
        note,
        velocity,
      },
    }
  ),
  noteOff: note => (
    {
      type: MIDI_NOTE_OFF,
      payload: {
        note,
      },
    }
  ),
}
