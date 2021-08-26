import {Framework, Module} from '@roots/bud-framework'

import {BudBrotliWebpackPlugin} from './BudBrotliWebpackPlugin'
import {BudGzipWebpackPlugin} from './BudGzipWebpackPlugin'

interface BudCompressionExtension extends Module {
  name: '@roots/bud-compress' & Module['name']
  boot(app: Framework): any
}

const name: BudCompressionExtension['name'] =
  '@roots/bud-compress'

const boot: BudCompressionExtension['boot'] = function boot({
  use,
}: Framework): any {
  use([BudBrotliWebpackPlugin, BudGzipWebpackPlugin])
}

const BudCompressionExtension: BudCompressionExtension = {
  name,
  boot,
}

export {BudCompressionExtension}
