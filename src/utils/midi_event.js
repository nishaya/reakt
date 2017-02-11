import {
  MIDI_NOTE_ON,
  MIDI_NOTE_OFF,
  MIDI_CONTROL_CHANGE,
} from 'actions/action_types'

export class NoteOnEvent {
  constructor(message) {
    this.channel = message[0] & 0b00001111
    this.note = message[1]
    this.velocity = message[2]
    this.type = MIDI_NOTE_ON
  }
}

export class NoteOffEvent {
  constructor(message) {
    this.channel = message[0] & 0b00001111
    this.note = message[1]
    this.velocity = message[2]
    this.type = MIDI_NOTE_OFF
  }
}

class ControllChangeEvent {
  constructor(message) {
    this.channel = message[0] & 0b00001111
    this.controlNumber = message[1]
    this.value = message[2]
    this.type = MIDI_CONTROL_CHANGE
  }
}

/* eslint no-bitwise: ["error", { "allow": ["&"] }] */
export default class MIDIEventFactory {
  static build(message) {
    // https://www.midi.org/specifications/item/table-1-summary-of-midi-message
    const table = {
      0b10000000: data => new NoteOffEvent(data),
      0b10010000: data => new NoteOnEvent(data),
      0b10110000: data => new ControllChangeEvent(data),
    }
    const status = message[0] & 0b11110000
    if (table[status]) {
      return table[status](message)
    }
    return null
  }
}
