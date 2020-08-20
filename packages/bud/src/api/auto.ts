import {Bud} from './types'

type Auto = (options: {[key: string]: string[]}) => Bud

const auto: Auto = function (options) {
  Object.entries(options).forEach(([key, modules]) => {
    modules.forEach(handle => {
      this.options.set('auto', {
        ...this.options.get('auto'),
        [handle]: key,
      })
    })
  })

  return this
}

export {auto}
export type {Auto}
