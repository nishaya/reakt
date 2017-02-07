import React, { Component } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import KeyboardInput from 'components/input/keyboard'
import MidiInput from 'components/input/midi'
import Synthesizer from 'components/synthesizer'

export default class IndexComponent extends Component {
  render() {
    return (<Card>
      <CardHeader title="REAKT" subtitle="synthesizer demo" />
      <CardText>
        <KeyboardInput ref={input => (this.keyboardInput = input)} />
        <MidiInput />
        <Synthesizer />
      </CardText>
    </Card>)
  }
}
