import { createAction } from 'redux-actions'
import { INPUT_KEY_DOWN } from './action_types'

export default {
  keyDown: createAction(INPUT_KEY_DOWN),
}
