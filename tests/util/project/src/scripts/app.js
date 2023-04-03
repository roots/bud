import React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './components/App.js'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

window.requestAnimationFrame(async function ready() {
  return document.body
    ? await import('./components/main.js').then(({main}) => main())
    : window.requestAnimationFrame(ready)
})
