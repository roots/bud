import {ChakraProvider} from '@chakra-ui/react'
import {createRoot} from 'react-dom/client'

import {App} from './app.js'

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(
    <ChakraProvider>
      <App />
    </ChakraProvider>,
  )
}
