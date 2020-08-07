import path from 'path'

import postCss from './postcss'
import babelWp from './babel/preset-wp'

/**
 * Preset configurations for common webpack plugins.
 */
const presets = {
  postCss: {
    config: postCss,
    file: path.join(__dirname, 'repositories/presets/postcss'),
  },
  ['babel-wp']: {
    config: babelWp(),
    file: path.join(__dirname, 'repositories/presets/babel/preset-wp'),
  },
}

export {presets}
