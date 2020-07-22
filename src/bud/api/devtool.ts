/**
 * Specify webpack devtool
 */
const devtool = function (devtool: string): Bud {
  this.state.options.devtool = devtool

  return this
}

export {devtool}
import type {Bud} from '..'