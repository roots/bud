import {Extension} from '@roots/bud-framework'
import CopyWebpackPlugin, {PluginOptions} from 'copy-webpack-plugin'

class BudCopyPlugin extends Extension.Extension<
  PluginOptions,
  CopyWebpackPlugin
> {
  public label = 'copy-webpack-plugin'

  public options() {
    return {patterns: []}
  }

  public make(options) {
    return new (require('copy-webpack-plugin'))({
      ...options.all(),
    })
  }

  public when() {
    return (
      this.getOptions().has('patterns') &&
      this.getOptions().isNotEmpty('patterns')
    )
  }
}

export default BudCopyPlugin
