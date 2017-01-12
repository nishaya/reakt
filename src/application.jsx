import React from 'react'
import { render } from 'react-dom'

// http://www.material-ui.com/#/
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

injectTapEventPlugin();

render((<MuiThemeProvider>
  <RaisedButton label="default" />
</MuiThemeProvider>), document.getElementById('app'))
