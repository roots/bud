import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components/App'

/**
 * Render application root.
 */
ReactDOM.render(<App />, document.getElementById('root'))

/**
 * Accept module updates
 *
 * @see https://webpack.js.org/api/hot-module-replacement
 */
if (module) {
  module.hot.accept(err => {
    console.error(err)
  })
}
