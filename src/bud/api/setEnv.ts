import type {Bud} from './Types'

/**
 * @todo env
 */
const setEnv = function (options: any): Bud {
  this.options.merge('env', options)

  return this
}

export {setEnv}
