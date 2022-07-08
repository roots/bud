import '@wordpress/edit-post'

import {registerBlockStyle, unregisterBlockStyle} from '@wordpress/blocks'
import domReady from '@wordpress/dom-ready'

/**
 * Block styles
 */
domReady(() => {
  unregisterBlockStyle('core/button', 'outline')

  registerBlockStyle('core/button', {
    name: 'outline',
    label: 'Outline',
  })
})

/**
 * Accept module updates
 *
 * @see https://webpack.js.org/api/hot-module-replacement
 */
module?.hot?.accept(err => {
  console.err(err)
})
