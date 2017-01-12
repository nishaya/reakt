import React from 'react'
import { render } from 'react-dom'

// http://www.material-ui.com/#/
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

injectTapEventPlugin();

const style = {
  marginLeft: 12,
}

render((<MuiThemeProvider>
  <Card>
    <CardHeader title="test app" subtitle="subtitle"/>
    <CardText>
      <RaisedButton label="ok" primary style={style} />
      <RaisedButton label="ng" secondary style={style} />
      <RaisedButton label="disabled" disabled style={style} />    
    </CardText>
  </Card>
</MuiThemeProvider>), document.getElementById('app'))
