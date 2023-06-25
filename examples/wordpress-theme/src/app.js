import React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './components/App.js'

import lodash from 'lodash'

console.log(lodash)

createRoot(document.getElementById('root')).render(<App />)
