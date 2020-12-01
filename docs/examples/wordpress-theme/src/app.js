import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components'
import domReady from '@wordpress/dom-ready'

domReady(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
})
