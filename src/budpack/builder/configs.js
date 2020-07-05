import {join} from 'path'
import {existsSync} from 'fs-extra'
import {paths} from './base'

/**
 * Returns absolute path to a config file
 *
 * @param  {string} file - relative path (from project root)
 * @return {string}
 */
const config = file => join(paths.project, file)

/**
 * Returns a boolean representing if a config can be located in the project root.
 *
 * @param  {string} file - relative path (from project root)
 * @return {boolean}
 */
const hasConfig = file => existsSync(config(file))

/**
 * Project configuration files.
 *
 * @typedef  {Object.<configs>}
 * @property {string|boolean} babel   - project babel.config.js
 * @property {string|boolean} eslint  - project .eslintrc.js
 * @property {string|boolean} postcss - project postcss.config.js
 */
const configs = {
  babel: hasConfig('babel.config.js') ? config('babel.config.js') : false,
  eslint: hasConfig('.eslintrc.js') ? config('.eslintrc.js') : false,
  postCss: hasConfig('postcss.config.js') ? config('postcss.config.js') : false,
}

export {configs}
