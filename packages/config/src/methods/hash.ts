import {Config} from '..'

export const hash: Config.Hash = function () {
  this.store['features'].set('hash', true)

  return this
}
