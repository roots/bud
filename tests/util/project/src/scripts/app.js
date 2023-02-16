import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components/App'

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'))

window.requestAnimationFrame(async function ready() {
  return document.body
    ? await import('./components/main').then(({main}) => main())
    : window.requestAnimationFrame(ready)
})
