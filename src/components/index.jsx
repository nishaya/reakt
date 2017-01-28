import React, { Component } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import KeyboardInput from 'components/input/keyboard'

export default class IndexComponent extends Component {
  render() {
    const style = {
      marginLeft: 12,
    }

    return (<Card>
      <CardHeader title="test app" subtitle="subtitle" />
      <CardText>
        <RaisedButton onMouseDown={e => console.log(e)} label="ok" primary style={style} />
        <RaisedButton label="ng" secondary style={style} />
        <RaisedButton label="disabled" disabled style={style} />
      </CardText>
      <KeyboardInput />
    </Card>)
  }
}
