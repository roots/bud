import {api} from './api'
import {bootstrap} from './bootstrapper'
import {
  makeContainer,
  makeExtensionContainer,
  makeFileContainer,
} from './container'
import {repositories} from './repositories'

import type {Bud, Use} from './types'
import type {
  Extension,
  ExtensionInterface,
} from './repositories/adapters'

repositories.extensions.forEach(ext => {
  bootstrap.apply(
    ext.repository,
    makeExtensionContainer(ext, bootstrap.framework),
  )
})
repositories.stores.forEach(store => {
  bootstrap.apply(
    store.repository,
    makeContainer(store, bootstrap.framework),
  )
})
repositories.files.forEach(file => {
  bootstrap.apply(
    file.repository,
    makeFileContainer(file, bootstrap.framework),
  )
})

bootstrap.apply('mode', bootstrap.framework.args.get('mode'))
bootstrap.apply(
  'inProduction',
  bootstrap.framework.args.is('mode', 'production'),
)
bootstrap.apply(
  'inDevelopment',
  bootstrap.framework.args.is('mode', 'development'),
)

Object.values(api).forEach((method: () => any) => {
  bootstrap.apply(method.name, method)
})

const bud: Bud = bootstrap.boot()

bud.options.set(
  'browserSync',
  bud.options.get('adapters.browsersync')(bud.flags),
)
bud.options.set('babel', bud.options.get('babel')(bud.configs))
bud.options.set('postcss', bud.options.get('postcss')(bud.flags))

/**
 * Bud Framework
 */
// const bud: Bud = new bootstrap().framework

export {bud, bootstrap}
export {Bud, Extension, ExtensionInterface, Use}
