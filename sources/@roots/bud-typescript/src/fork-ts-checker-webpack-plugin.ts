import {Extension} from '@roots/bud-framework'
import {label, plugin} from '@roots/bud-framework/extension/decorators'
import Plugin from 'fork-ts-checker-webpack-plugin'

import * as factory from './options'

@plugin(Plugin)
@label('fork-ts-checker-webpack-plugin')
class BudTypeCheckPlugin extends Extension<Plugin['options'], Plugin> {
  public async init() {
    this.options = this.app.isProduction
      ? factory.production(this.app)
      : factory.development(this.app)
  }
}

export default BudTypeCheckPlugin
