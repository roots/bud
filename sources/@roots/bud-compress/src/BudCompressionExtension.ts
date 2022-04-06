import '@roots/bud-api'

import {Bud, Extension} from '@roots/bud-framework'

import {BudBrotliWebpackPlugin} from './BudBrotliWebpackPlugin'
import {BudGzipWebpackPlugin} from './BudGzipWebpackPlugin'

interface BudCompressionExtension extends Extension.Plugin {
  name: '@roots/bud-compress' & Extension.Plugin['name']
  boot(app: Bud): any
}

const name: BudCompressionExtension['name'] = '@roots/bud-compress'

const boot: BudCompressionExtension['boot'] = async function boot(app) {
  await app.extensions.add([BudBrotliWebpackPlugin, BudGzipWebpackPlugin])
}

const BudCompressionExtension: BudCompressionExtension = {
  name,
  boot,
}

export {BudCompressionExtension}
