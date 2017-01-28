import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import IndexComponent from 'components/index'
import reducers from 'reducers/index'

// http://www.material-ui.com/#/
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()
const store = createStore(reducers)

render((<Provider store={store}>
  <MuiThemeProvider>
    <IndexComponent />
  </MuiThemeProvider>
</Provider>), document.getElementById('app'))
