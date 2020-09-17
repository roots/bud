import BudInterface from '../Bud'
import {Options} from 'webpack'

/**
 * ## bud.devtool
 *
 * Specify a devtool for use in.
 */
export type Devtool = (devtool: Options.Devtool) => BudInterface

const devtool: Devtool = function (devtool?) {
  this.features.enable('devtool')

  devtool && this.options.set('webpack.devtool', devtool)

  return this
}

export {devtool as default}
