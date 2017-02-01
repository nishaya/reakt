import MIDIEventFactory from 'utils/midi_event'
import {
  MIDI_NOTE_ON,
  MIDI_NOTE_OFF,
  MIDI_CONTROLL_CHANGE,
} from './action_types'

export default {
  onMidiMessage: (message) => {
    const event = MIDIEventFactory.build(message)
    console.log('midiMessage', message, event)

    const actionTypes = {
      NoteOnEvent: MIDI_NOTE_ON,
      NoteOffEvent: MIDI_NOTE_OFF,
      ControllChangeEvent: MIDI_CONTROLL_CHANGE,
    }

    return {
      type: actionTypes[event.constructor.name],
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
