import { MIDI_NOTE_ON, MIDI_NOTE_OFF, MIDI_CONTROL_CHANGE } from 'actions/action_types'
import createReducer from './create_reducer'

const initialState = {
  noteOn: Array(128).fill(0).reduce((o, v, i) => ({ ...o, [i]: 0 }), {}),
  controlChange: Array(128).fill(0).reduce((o, v, i) => ({ ...o, [i]: 0 }), {}),
}

export default createReducer(initialState, {
  [MIDI_NOTE_ON](state, action) {
    console.log(action.payload.event.noteOn)
    return {
      ...state,
      noteOn: { ...state.noteOn, [action.payload.event.note]: action.payload.event.velocity },
    }
  },
  [MIDI_NOTE_OFF](state, action) {
    return { ...state, noteOn: { ...state.noteOn, [action.payload.event.note]: 0 } }
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
