import { MIDIEventFactory, NoteOnEvent, NoteOffEvent } from 'utils/midi_event'
import {
  MIDI_INPUT_SELECTED,
  MIDI_NOTE_ON,
  MIDI_NOTE_OFF,
} from 'actions/action_types'


export default {
  selectMidiDevice: deviceId => (
    {
      type: MIDI_INPUT_SELECTED,
      payload: deviceId,
    }
  ),
  midiNoteOn: (note, velocity) => (
    {
      type: MIDI_NOTE_ON,
      payload: {
        event: new NoteOnEvent([0, note, velocity]),
      },
    }
  ),
  midiNoteOff: note => (
    {
      type: MIDI_NOTE_OFF,
      payload: {
        event: new NoteOffEvent([0, note, 0]),
      },
    }
  ),
  onMidiMessage: (message) => {
    const event = MIDIEventFactory.build(message)
    console.log('onMidiMessage', message, event)
    return event ? {
      type: event.type,
      payload: {
        event,
      },
    } : null
  },
}
