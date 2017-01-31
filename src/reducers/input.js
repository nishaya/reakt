import { INPUT_KEY_DOWN, INPUT_KEY_UP } from 'actions/action_types'
import createReducer from './create_reducer'

const initialState = {
  keyUp: {},
  keyDown: {},
}

export default createReducer(initialState, {
  [INPUT_KEY_UP](state, action) {
    return { ...state, keyUp: { ...state.keyUp, [action.payload]: true } }
  },
  [INPUT_KEY_DOWN](state, action) {
    return { ...state, keyDown: { ...state.keyDown, [action.payload]: true } }
  },
})
