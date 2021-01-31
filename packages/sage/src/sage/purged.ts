/**
 * Sage - Bootstrap preset
 */

import {sage} from './base'

import * as purgecss from '@roots/bud-purgecss'
import withWordPress from 'purgecss-with-wordpress'

sage.use(purgecss).purge({
  content: [
    'resources/views/**/*',
    'resources/assets/scripts/**/*',
  ],
  css: ['resources/assets/styles/**/*'],
  ...withWordPress,
})

export {sage}
