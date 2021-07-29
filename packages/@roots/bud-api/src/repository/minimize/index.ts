import {Repository} from '../'

/**
 * @function minimize
 */
const minimize: Repository.Minimize = function (enabled = true) {
  this.hooks.on('build/optimization/minimize', () => enabled)

  return this
}

/**
 * @exports minimize
 */
export {minimize}
