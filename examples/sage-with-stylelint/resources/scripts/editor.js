import '@wordpress/edit-post'

import {registerBlockStyle, unregisterBlockStyle} from '@wordpress/blocks'
import domReady from '@wordpress/dom-ready'

domReady(() => {
  unregisterBlockStyle('core/button', 'outline')

  registerBlockStyle('core/button', {
    name: 'outline',
    label: 'Outline',
  })
})

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error)
}
