import MIDIEventFactory from 'utils/midi_event'
import {
  MIDI_NOTE_ON,
  MIDI_NOTE_OFF,
} from './action_types'

export default {
  onMidiMessage: (message) => {
    const event = MIDIEventFactory.build(message)
    console.log('midiMessage', message, event)

    return {
      type: MIDI_NOTE_ON,
      payload: {
        event,
      },
    }
  },
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
