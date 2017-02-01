import { MIDI_NOTE_ON, MIDI_NOTE_OFF } from 'actions/action_types'
import createReducer from './create_reducer'

const initialState = {
  noteOn: Array(128).fill(0).reduce((o, v, i) => ({ ...o, [i]: false }), {}),
}

export default createReducer(initialState, {
  [MIDI_NOTE_ON](state, action) {
    return { ...state, noteOn: { ...state.noteOn, [action.payload.key]: true } }
  },
  [MIDI_NOTE_OFF](state, action) {
    return { ...state, noteOn: { ...state.noteOn, [action.payload.key]: false } }
  },
})
