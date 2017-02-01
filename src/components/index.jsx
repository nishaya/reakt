import React, { Component } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import KeyboardInput from 'components/input/keyboard'
import MidiInput from 'components/input/midi'
import OscillatorComponent from 'components/synth/oscillator'

export default class IndexComponent extends Component {
  constructor(props) {
    super(props)
    this.onOKButtonClicked = this.showKey.bind(this)
  }

  showKey() {
    console.log(this.keyboardInput.getWrappedInstance().key)
  }

  render() {
    const style = {
      marginLeft: 12,
    }

    return (<Card>
      <CardHeader title="test app" subtitle="subtitle" />
      <CardText>
        <RaisedButton onMouseDown={this.onOKButtonClicked} label="ok" primary style={style} />
        <RaisedButton label="ng" secondary style={style} />
        <RaisedButton label="disabled" disabled style={style} />
      </CardText>
      <KeyboardInput ref={input => (this.keyboardInput = input)} />
      <MidiInput />
      <OscillatorComponent />
    </Card>)
  }
}
