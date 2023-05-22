import React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from '@components/app'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
;(async function read() {
  await import('./components/main.js').then(({main}) => main())
})()

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)
