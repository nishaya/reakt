import React, { Component } from 'react'
import { Card, CardText } from 'material-ui/Card'
import Synthesizer from 'components/synthesizer'

export default class IndexComponent extends Component {
  render() {
    return (<div>
      <div className="reakt-header">
        <h1>REAKT</h1>
        <div className="reakt-header__subtitle">Polyphonic Web Synthesizer</div>
      </div>
      <Card>
        <CardText>
          <Synthesizer />
        </CardText>
      </Card>
    </div>)
  }
}
