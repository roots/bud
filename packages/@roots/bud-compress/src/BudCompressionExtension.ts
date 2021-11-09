import {Extension, Framework} from '@roots/bud-framework'

import {BudBrotliWebpackPlugin} from './BudBrotliWebpackPlugin'
import {BudGzipWebpackPlugin} from './BudGzipWebpackPlugin'

interface BudCompressionExtension
  extends Extension.CompilerPlugin {
  name: '@roots/bud-compress' & Extension.CompilerPlugin['name']
  boot(app: Framework): any
}

const name: BudCompressionExtension['name'] =
  '@roots/bud-compress'

const boot: BudCompressionExtension['boot'] =
  async function boot({use}: Framework): Promise<void> {
    await use([BudBrotliWebpackPlugin, BudGzipWebpackPlugin])
  }

const BudCompressionExtension: BudCompressionExtension = {
  name,
  boot,
}

export {BudCompressionExtension}
