/**
 * Specify webpack devtool
 */
const devtool = function (devtool: string): bud {
  this.options.devtool = devtool

  return this
}

export {devtool}
import type {bud} from '..'
