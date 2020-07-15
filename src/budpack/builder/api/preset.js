import {join} from 'path'

/**
 * ## bud.preset
 *
 * Retrieve a Bud framework preset.
 *
 * ### Examples
 *
 * ```js
 * bud.preset('babel/postcss')
 * ```
 *
 * ```js
 * bud.preset('babel/preset-react')
 * ```
 *
 * ```js
 * bud.preset('tsconfig')
 * ```
 *
 * @typedef {function (relativePath: string) => {absolutePath: string}} preset
 * @param  {string} relativePath - relative path
 * @return {string} absolutePath
 */
const preset = function (relativePath) {
  const presetConfig = join(
    this.paths.framework,
    'config',
    relativePath,
  )

  return require(presetConfig)
}

export {preset}
