const eslint: string = require.resolve('./presets/eslint')
const postCss: string = require.resolve('./presets/postcss')
const stylelint: string = require.resolve('./presets/stylelint')
const babelWp: string = require.resolve('./presets/babel/preset-wp')
const babelReact: string = require.resolve('./presets/babel/preset-react')

/**
 * Preset configurations for common webpack plugins.
 */
const presets = {
  eslint,
  postCss,
  stylelint,
  ['babel-wp']: babelWp,
  ['babel-react']: babelReact,
}

export {presets}
