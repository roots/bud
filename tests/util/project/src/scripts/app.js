import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components/App.js'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

window.requestAnimationFrame(async function ready() {
  return document.body
    ? await import('./components/main.js').then(({main}) => main())
    : window.requestAnimationFrame(ready)
})
