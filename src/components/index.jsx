import React, { Component } from 'react'
import { Card, CardText } from 'material-ui/Card'
import KeyboardInput from 'components/input/keyboard'
// import MidiInput from 'components/input/midi'
import Synthesizer from 'components/synthesizer'

export default class IndexComponent extends Component {
  render() {
    return (<div>
      <div className="reakt-header">
        <h1>REAKT</h1>
        <div className="reakt-header__subtitle">Polyphonic Synthesizer</div>
      </div>
      <Card>
        <CardText>
          <KeyboardInput ref={input => (this.keyboardInput = input)} />
          <Synthesizer />
        </CardText>
      </Card>
    </div>)
  }
}
