import type {Repository} from '../'

const minimize: Repository.Minimize = function (enabled = true) {
  this.hooks.on('build/optimization/minimize', () => enabled)

  return this
}

export {minimize}
