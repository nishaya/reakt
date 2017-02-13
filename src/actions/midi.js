import {
  MIDIEventFactory,
  NoteOnEvent,
  NoteOffEvent,
  ControlChangeEvent,
} from 'utils/midi_event'
import {
  MIDI_INPUT_SELECTED,
  MIDI_NOTE_ON,
  MIDI_NOTE_OFF,
  MIDI_CONTROL_CHANGE,
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
  midiControlChange: (cc, value) => (
    {
      type: MIDI_CONTROL_CHANGE,
      payload: {
        event: new ControlChangeEvent([0, cc, value]),
      },
    }
  ),
  onMidiMessage: (message) => {
    const event = MIDIEventFactory.build(message)
    console.log('onMidiMessage', message, event)
    if (!event) {
      return { type: null }
    }
    return {
      type: event.type,
      payload: {
        event,
      },
    }
  },
}
