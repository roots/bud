/* eslint-disable */

import React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './components/App.js'

import 'lodash'
import 'jquery'

createRoot(document.getElementById('root')).render(<App />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error)
}
