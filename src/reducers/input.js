import createReducer from './create_reducer'

const INPUT_KEY_DOWN = 'INPUT_KEY_DOWN'

const initialState = {
  keyDown: {},
}

export default createReducer(initialState, {
  [INPUT_KEY_DOWN](state, action) {
    return { ...state, keyDown: { ...state.keyDown, key: action.payload.key } }
  },
})
