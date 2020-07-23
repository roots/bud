/**
 * Development server settings
 */
const dev = function (options: object): Bud {
  this.state.options.dev = {
    ...this.state.options.dev,
    ...options,
  }

  return this
}

export {dev}

import type {Bud} from '..'
