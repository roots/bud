import './scripts.js'

import React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from '@components/app'

createRoot(document.querySelector(`#root`)).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
