import {Options, Extension} from './interface'
import * as Entrypoints from '@roots/entrypoints-webpack-plugin'

/**
 * @const DEFAULT_OPTIONS
 * @description default options for entrypoints-webpack-plugin
 */
const DEFAULT_OPTIONS: Options = {
  name: 'entrypoints.json',
  writeToFileEmit: true,
}

/**
 * @const extension
 * @extends Framework
 */
const extension: Extension = {
  name: '@roots/bud-entrypoints',
  options: () => DEFAULT_OPTIONS,
  make: options => new Entrypoints.Plugin(options.all()),
}

/**
 * @exports default
 */
export {extension as default}

/**
 * @exports module
 */
const {name, options, make} = extension
export {name, options, make}
