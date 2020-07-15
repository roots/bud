import {join} from 'path'
import {existsSync} from 'fs-extra'
import {paths} from './paths'

/**
 * Config
 *
 * @typedef {function (relativePath: string) => {filePath: string}} config
 * @param   {string} relativePath - relative path (from project root)
 * @return  {string} filePath
 */
const config = file => join(paths.project, file)

/**
 * Has config
 *
 * @typedef {function (file: string) => boolean} hasConfig
 * @param   {string} file - file path (relative to project root)
 * @return  {boolean} true if file exists
 */
const hasConfig = file => existsSync(config(file))

/**
 * Maybe config
 * @typedef {function (file: string) => (boolean|string)} maybeConfig
 * @param {string} file - file path (relative to project root)
 * @param {string} file - fallback config file path
 */
const maybeConfig = (file, fallback = null) =>
  hasConfig(file) ? config(file) : fallback

/**
 * Project configuration files.
 *
 * @typedef  {{babel: (boolean|string), eslint: (boolean|string), postCss: (boolean|string)}} configs
 * @property {(string|boolean)} babel   - project babel.config.js
 * @property {(string|boolean)} eslint  - project .eslintrc.js
 * @property {(string|boolean)} postcss - project postcss.config.js
 */
const configs = {
  babel: maybeConfig('babel.config.js'),
  eslint: maybeConfig('.eslintrc.js'),
  postCss: maybeConfig('postcss.config.js'),
  typescript: maybeConfig('tsconfig.json'),
}

export {config, hasConfig, maybeConfig, configs}
