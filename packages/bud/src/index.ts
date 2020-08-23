import {api} from './api'
import {compiler} from './compiler'
import {framework} from '@roots/bud-framework'
import type {Bud, Use} from './types'
import type {
  Extension,
  ExtensionInterface,
} from './repositories/plugins'
import {repositories} from './repositories'

repositories.extensions.forEach(store => {
  framework.bindExtensions(store.name, store)
})

repositories.files.forEach(store => {
  framework.bindFiles(store.name, store)
})

repositories.stores.forEach(store => {
  framework.bind(store.name, store)
})

framework.apply('mode', framework.args.get('mode'))

framework.apply(
  'inProduction',
  framework.args.is('mode', 'production'),
)

framework.apply(
  'inDevelopment',
  framework.args.is('mode', 'development'),
)

framework.options.set(
  'webpack.plugins.browsersync',
  framework.options.get('webpack.plugins.browsersync')(
    framework.flags,
  ),
)

const babel = framework.options.get('babel')
framework.options.set('babel', babel(framework.configs))

const postcss = framework.options.get('postcss')
framework.options.set('postcss', postcss(framework.flags))

framework.apply('fs', framework.util.fs)

Object.values(api).forEach((method: () => any) => {
  framework.apply(method.name, method)
})

framework.apply('compiler', compiler(framework))
framework.apply('hooks', framework.hooks(framework))

const bud: Bud = framework

export {bud}
export {Bud, Extension, ExtensionInterface, Use}
