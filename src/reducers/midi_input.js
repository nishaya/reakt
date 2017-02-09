import {
  MIDI_INPUT_SELECTED,
} from 'actions/action_types'
import createReducer from './create_reducer'

const initialState = {
  deviceId: null,
}

export default createReducer(initialState, {
  [MIDI_INPUT_SELECTED](state, action) {
    return { ...state, deviceId: action.payload }
  },
})
