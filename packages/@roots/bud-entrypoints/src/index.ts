import './interface'
import {Module} from '@roots/bud-framework'
import * as EntrypointsPlugin from '@roots/entrypoints-webpack-plugin'

/**
 * @const extension
 * @extends Framework
 */
const extension: Module = {
  name: '@roots/bud-entrypoints',
  make: () => new EntrypointsPlugin.Plugin(),
}

const {name, make} = extension

/**
 * @exports
 */
export {extension as default, name, make}
