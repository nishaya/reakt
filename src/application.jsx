import React from 'react'
import { render } from 'react-dom'
import IndexComponent from 'components/index'

// http://www.material-ui.com/#/
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

render((<MuiThemeProvider>
  <IndexComponent />
</MuiThemeProvider>), document.getElementById('app'))
