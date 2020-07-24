import type {Bud, Dev} from './types'

/**
 * Development server settings
 */
const dev: Dev = function (options: object): Bud {
  this.state.options.dev = {
    ...this.state.options.dev,
    ...options,
  }

  return this
}

export {dev}
