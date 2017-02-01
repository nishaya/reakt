import { MIDI_NOTE_ON, MIDI_NOTE_OFF, MIDI_CONTROL_CHANGE } from 'actions/action_types'
import createReducer from './create_reducer'

const initialState = {
  noteOn: Array(128).fill(0).reduce((o, v, i) => ({ ...o, [i]: false }), {}),
  controlChange: Array(128).fill(0).reduce((o, v, i) => ({ ...o, [i]: 0 }), {}),
}

export default createReducer(initialState, {
  [MIDI_NOTE_ON](state, action) {
    return { ...state, noteOn: { ...state.noteOn, [action.payload.event.note]: true } }
  },
  [MIDI_NOTE_OFF](state, action) {
    return { ...state, noteOn: { ...state.noteOn, [action.payload.event.note]: false } }
  },
  [MIDI_CONTROL_CHANGE](state, action) {
    return {
      ...state,
      controlChange: {
        ...state.controlChange,
        [action.payload.event.controlNumber]: action.payload.event.value,
      },
    }
  },
})
