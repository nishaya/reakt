import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import IndexComponent from 'components/index'
import reducers from 'reducers/index'

// http://www.material-ui.com/#/
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()

const createPersistentStore = compose()(createStore)

const middlewares = applyMiddleware(createLogger())
const store = createPersistentStore(reducers, middlewares)

render((<Provider store={store}>
  <MuiThemeProvider>
    <IndexComponent />
  </MuiThemeProvider>
</Provider>), document.getElementById('app'))
