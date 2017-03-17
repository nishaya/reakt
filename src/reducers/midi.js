import {
  MIDI_NOTE_ON,
  MIDI_NOTE_OFF,
  MIDI_CONTROL_CHANGE,
} from 'actions/action_types'
import createReducer from './create_reducer'

const initHash = Array(128).fill(0).reduce((o, v, i) => ({ ...o, [i]: 0 }), {})
const initialState = {
  noteOn: { ...initHash },
  controlChange: { ...initHash },
  logs: [],
}

function createLogs(message, state) {
  const logs = state.logs.slice(-4)
  logs.push({ message, time: performance.now() })
  return logs
}

export default createReducer(initialState, {
  [MIDI_NOTE_ON](state, action) {
    return {
      ...state,
      logs: createLogs(`note on #${action.payload.event.note}`, state),
      noteOn: { ...state.noteOn, [action.payload.event.note]: action.payload.event.velocity },
    }
  },
  [MIDI_NOTE_OFF](state, action) {
    return {
      ...state,
      logs: createLogs(`note off #${action.payload.event.note}`, state),
      noteOn: { ...state.noteOn, [action.payload.event.note]: 0 },
    }
  },
  [MIDI_CONTROL_CHANGE](state, action) {
    return {
      ...state,
      logs: createLogs(
        `CC #${action.payload.event.controlNumber} - ${action.payload.event.value}`,
        state,
      ),
      controlChange: {
        ...state.controlChange,
        [action.payload.event.controlNumber]: action.payload.event.value,
      },
    }
  },
})
