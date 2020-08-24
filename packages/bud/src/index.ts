import {framework} from '@roots/bud-framework'
import {compiler} from '@roots/bud-compiler'
import {api} from './api'
import {repositories} from './repositories'
import {config} from './config'
import type {
  Extension,
  ExtensionInterface,
} from './repositories/plugins'
import type {Bud, Use} from './types'

/**
 * Bind stores.
 */
repositories.stores.forEach(store => {
  framework.bind(store.name, store)
})

/**
 * Bind file stores.
 */
repositories.files.forEach(store => {
  framework.bindFiles(store.name, store)
})

/**
 * Bind stores.
 */
repositories.extensions.forEach(store => {
  framework.bindExtensions(store.name, store)
})

/**
 * Bind `mode` and helpers.
 */
framework.apply('mode', framework.args.get('mode'))
framework.apply(
  'inProduction',
  framework.args.is('mode', 'production'),
)
framework.apply(
  'inDevelopment',
  framework.args.is('mode', 'development'),
)

/**
 * Set options.
 */
const babel = framework.options.get('babel')
framework.options.set('babel', babel(framework.configs))

const postcss = framework.options.get('postcss')
framework.options.set('postcss', postcss(framework.flags))

const browsersync = framework.options.get(
  'webpack.plugins.browsersync',
)
framework.options.set(
  'webpack.plugins.browsersync',
  browsersync(framework.flags),
)

framework.apply('compiler', compiler)
framework.apply('fs', framework.util.fs)
framework.apply('hooks', framework.hooks(framework))
framework.apply('config', config(framework))

/**
 * Bind the public API.
 */
Object.values(api).forEach((method: () => any) => {
  framework.apply(method.name, method)
})

/**
 * This can properly be typed as Bud.
 */
const bud: Bud = framework

export {bud}
export {Bud, Extension, ExtensionInterface, Use}
