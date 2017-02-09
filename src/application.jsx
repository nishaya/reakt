import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import IndexComponent from 'components/index'
import reducers from 'reducers/index'
import persistState from 'redux-localstorage'

// http://www.material-ui.com/#/
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import reaktTheme from 'styles/reakt_theme'
import applicationStyle from './application.scss'

const createPersistentStore = compose(
  persistState('midiInput'),
)(createStore)

injectTapEventPlugin()

const middlewares = process.env.NODE_ENV === 'development' ?
  applyMiddleware(createLogger()) : applyMiddleware()

const store = createPersistentStore(reducers, middlewares)

render((<Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(reaktTheme)}>
    <IndexComponent />
  </MuiThemeProvider>
</Provider>), document.getElementById('app'))
