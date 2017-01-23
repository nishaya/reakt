import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export default class IndexComponent extends Component {
  render() {
    const style = {
      marginLeft: 12,
    }
    
    return (<Card>
          <CardHeader title="test app" subtitle="subtitle"/>
          <CardText>
            <RaisedButton onMouseDown={e => console.log(e)} label="ok" primary style={style} />
            <RaisedButton label="ng" secondary style={style} />
            <RaisedButton label="disabled" disabled style={style} />
          </CardText>
        </Card>)
  }
}
