import MIDIEventFactory from 'utils/midi_event'
import { MIDI_INPUT_SELECTED } from 'actions/action_types'

export default {
  selectMidiDevice: deviceId => (
    {
      type: MIDI_INPUT_SELECTED,
      payload: deviceId,
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
