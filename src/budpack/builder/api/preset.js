import {join} from 'path'

/**
 * Retrieve a Bud framework preset
 * @example bud.preset('babel/postcss')
 * @example bud.preset('babel/preset-react')
 * @typedef {function (relativePath: string) => {absolutePath: string}} preset
 * @param  {string} relativePath - relative path
 * @return {string} absolutePath
 */
const preset = function (relativePath) {
  return join(this.paths.framework, 'config', relativePath)
}

export {preset}
