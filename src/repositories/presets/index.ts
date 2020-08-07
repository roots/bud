import path from 'path'

import eslint from './eslint'
import postCss from './postcss'
import stylelint from './stylelint'
import babelWp from './babel/preset-wp'

/**
 * Preset configurations for common webpack plugins.
 */
const presets = {
  eslint: {
    config: eslint,
    file: path.join(__dirname, 'repositories/presets/eslint'),
  },
  postCss: {
    config: postCss,
    file: path.join(__dirname, 'repositories/presets/postcss'),
  },
  stylelint: {
    config: stylelint,
    file: path.join(__dirname, 'repositories/presets/stylelint')
  },
  ['babel-wp']: {
    config: babelWp,
    file: path.join(__dirname, 'repositories/presets/babel/preset-wp'),
  },
}

export {presets}
