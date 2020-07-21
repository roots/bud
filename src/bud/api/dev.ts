/**
 * Development server settings
 */
const dev = function (options: object): bud {
  this.options.dev = {
    ...this.options.dev,
    ...options,
  }

  return this
}

export {dev}

import type {bud} from '..'
