import '@roots/bud-api'

import {Bud, Extension} from '@roots/bud-framework'

import {BudBrotliWebpackPlugin} from './BudBrotliWebpackPlugin'
import {BudGzipWebpackPlugin} from './BudGzipWebpackPlugin'

interface BudCompressionExtension extends Extension.Module {
  label: '@roots/bud-compress' & Extension.Module['label']
  boot(app: Bud): any
}

const label: BudCompressionExtension['label'] = '@roots/bud-compress'

const boot: BudCompressionExtension['boot'] = async function boot(app) {
  await app.extensions.add([BudBrotliWebpackPlugin, BudGzipWebpackPlugin])
}

const BudCompressionExtension: BudCompressionExtension = {
  label,
  boot,
}

export {BudCompressionExtension}
