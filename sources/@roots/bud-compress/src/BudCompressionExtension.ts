import '@roots/bud-api'

import {Extension} from '@roots/bud-framework'

import BudBrotliWebpackPlugin from './BudBrotliWebpackPlugin'
import BudGzipWebpackPlugin from './BudGzipWebpackPlugin'

class BudCompressionExtension extends Extension<any, any> {
  public label = '@roots/bud-compress'
  public async boot() {
    await this.app.extensions.add([
      BudBrotliWebpackPlugin,
      BudGzipWebpackPlugin,
    ])
  }
}

export default BudCompressionExtension
