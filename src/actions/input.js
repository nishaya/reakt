import { createAction } from 'redux-actions'
import {
  INPUT_KEY_DOWN,
  INPUT_KEY_UP,
} from './action_types'

export default {
  keyDown: createAction(INPUT_KEY_DOWN),
  keyUp: createAction(INPUT_KEY_UP),
}
