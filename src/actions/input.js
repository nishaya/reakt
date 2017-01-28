import ActionTypes, { INPUT_KEY_DOWN } from './action_types'

console.log(ActionTypes.INPUT_KEY_DOWN)
console.log(INPUT_KEY_DOWN)

export default {
  keyDown: key => (
    {
      type: ActionTypes.INPUT_KEY_DOWN,
      payload: {
        key,
      },
    }
  ),
}
