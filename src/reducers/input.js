import { INPUT_KEY_DOWN } from 'actions/action_types'
import createReducer from './create_reducer'

const initialState = {
  keyDown: {},
}

export default createReducer(initialState, {
  [INPUT_KEY_DOWN](state, action) {
    return { ...state, keyDown: { ...state.keyDown, [action.payload.key]: true } }
  },
})
