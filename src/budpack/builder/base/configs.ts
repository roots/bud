import {join} from 'path'
import {existsSync} from 'fs-extra'
import {paths} from './paths'

/**
 * Config
 * @param   {string} relativePath - relative path (from project root)
 * @return  {string} filePath
 */
const config = file => join(paths.project, file)

/**
 * Has config
 *
 * @param   {string} file - file path (relative to project root)
 * @return  {boolean} true if file exists
 */
const hasConfig = file => existsSync(config(file))

/**
 * Maybe config
 *
 * @param {string} file - file path (relative to project root)
 * @param {string} file - fallback config file path
 */
const maybeConfig = (file, fallback = null) =>
  hasConfig(file) ? config(file) : fallback

/**
 * Project configuration files.
 *
 * @property {(string|boolean)} babel   - project babel.config.js
 * @property {(string|boolean)} eslint  - project .eslintrc.js
 * @property {(string|boolean)} postcss - project postcss.config.js
 */
const configs: Configs = {
  babel: maybeConfig('babel.config.js'),
  eslint: maybeConfig('.eslintrc.js'),
  postCss: maybeConfig('postcss.config.js'),
  typescript: maybeConfig('tsconfig.json'),
}

export {
  config,
  hasConfig,
  maybeConfig,
  configs
}

export type Configs = {
  babel: (string | null),
  eslint: (string | null),
  postCss: (string | null),
  typescript: (string | null),
}

