import { combineReducers } from 'redux'

import input from './input'
import midi from './midi'
import midiInput from './midi_input'

export default combineReducers({
  input,
  midi,
  midiInput,
})
