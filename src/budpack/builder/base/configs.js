import {join} from 'path'
import {existsSync} from 'fs-extra'
import {paths} from './paths'

/**
 * Returns absolute path to a project config file
 * @typedef {function (relativePath: string) => {filePath: string}} config
 * @param   {string} relativePath - relative path (from project root)
 * @return  {string} filePath
 */
const config = relativePath =>
  join(paths.project, relativePath)

/**
 * Returns a boolean representing if a file can be located in the project root.
 * @typedef {function (file: string) => boolean} hasConfig
 * @param   {string} file - file path (relative to project root)
 * @return  {boolean} true if file exists
 */
const hasConfig = file => existsSync(config(file))

/**
 * Project configuration files.
 * @typedef  {{babel: (boolean|string), eslint: (boolean|string), postCss: (boolean|string)}} configs
 * @property {(string|boolean)} babel   - project babel.config.js
 * @property {(string|boolean)} eslint  - project .eslintrc.js
 * @property {(string|boolean)} postcss - project postcss.config.js
 */
const configs = {
  babel: hasConfig('babel.config.js')
    ? config('babel.config.js')
    : false,
  eslint: hasConfig('.eslintrc.js')
    ? config('.eslintrc.js')
    : false,
  postCss: hasConfig('postcss.config.js')
    ? config('postcss.config.js')
    : false,
}

export {config, hasConfig, configs}
