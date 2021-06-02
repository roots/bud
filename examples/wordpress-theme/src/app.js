import React from 'react'
import {render} from 'react-dom'
import {App} from './components/App'

render(<App />, document.getElementById('root'))

module?.hot?.accept(err => {
  console.err(err)
})
