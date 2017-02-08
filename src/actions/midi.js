import MIDIEventFactory from 'utils/midi_event'

export default {
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
