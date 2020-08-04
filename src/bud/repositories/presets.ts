const eslint: string = require.resolve('../../../preset/eslint')
const postCss: string = require.resolve('../../../preset/postcss')
const stylelint: string = require.resolve('../../../preset/stylelint')
const babelWp: string = require.resolve('../../../preset/babel/preset-wp')
const babelReact: string = require.resolve('../../../preset/babel/preset-react')

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
