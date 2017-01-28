import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import IndexComponent from 'components/index'
import reducers from 'reducers/index'

// http://www.material-ui.com/#/
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()

const middlewares = applyMiddleware(createLogger())
const store = createStore(reducers, middlewares)

render((<Provider store={store}>
  <MuiThemeProvider>
    <IndexComponent />
  </MuiThemeProvider>
</Provider>), document.getElementById('app'))
