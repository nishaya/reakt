import React, { Component } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import KeyboardInput from 'components/input/keyboard'
import MidiInput from 'components/input/midi'
import OscillatorComponent from 'components/synth/oscillator'

export default class IndexComponent extends Component {
  render() {
    return (<Card>
      <CardHeader title="test app" subtitle="subtitle" />
      <CardText>
        <KeyboardInput ref={input => (this.keyboardInput = input)} />
        <MidiInput />
        <OscillatorComponent />
      </CardText>
    </Card>)
  }
}
