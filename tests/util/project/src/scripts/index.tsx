import './scripts.js'

import React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from '@components/app'

document.querySelector(`#root`) &&
  createRoot(document.querySelector(`#root`)).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
