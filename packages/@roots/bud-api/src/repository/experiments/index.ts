import type {Repository} from '../'

export const experiments: Repository.Experiments = function (
  settings,
) {
  this.hooks.on('build/experiments', settings)

  return this
}
