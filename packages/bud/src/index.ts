import {api} from './api'
import {bootstrap} from './bootstrapper'
import {
  registerContainer,
  registerExtensionContainer,
  registerFileContainer,
} from './container'
import type {Bud, Use} from './types'
import type {
  Extension,
  ExtensionInterface,
} from './repositories/plugins'

bootstrap.repositories.extensions.forEach(store => {
  bootstrap.framework[store.name] = registerExtensionContainer(store)
})
bootstrap.repositories.files.forEach(store => {
  bootstrap.framework[store.name] = registerFileContainer(store)
})
bootstrap.repositories.stores.forEach(store => {
  bootstrap.framework[store.name] = registerContainer(store)
})

bootstrap.framework.mode = bootstrap.framework.args.get('mode')
bootstrap.framework.inProduction = bootstrap.framework.args.is(
  'mode',
  'production',
)
bootstrap.framework.inDevelopment = bootstrap.framework.args.is(
  'mode',
  'development',
)

Object.values(api).forEach((method: () => any) => {
  bootstrap.framework[method.name] = method
})

const bud: Bud = bootstrap.boot()

bud.options.set(
  'webpack.plugins.browsersync',
  bud.options.get('webpack.plugins.browsersync')(bud.flags),
)
bud.options.set('babel', bud.options.get('babel')(bud.configs))
bud.options.set('postcss', bud.options.get('postcss')(bud.flags))

bud.apply = function (propertyName: string, propertyValue: any): Bud {
  bud[propertyName] = propertyValue

  return this
}

export {bud, bootstrap}
export {Bud, Extension, ExtensionInterface, Use}
