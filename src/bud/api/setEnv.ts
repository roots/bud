import type {Bud} from './Types'

/**
 * @todo env
 */
const setEnv = function (options: any): Bud {
  this.state.options.env = {
    ...this.state.options.env,
    ...options,
  }

  return this
}

export {setEnv}
