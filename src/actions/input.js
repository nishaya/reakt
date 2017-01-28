import { INPUT_KEY_DOWN } from './action_types'

export default {
  keyDown: key => (
    {
      type: INPUT_KEY_DOWN,
      payload: {
        key,
      },
    }
  ),
}
